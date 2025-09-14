import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { backend_url, server } from "../../server";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import styles from "../../styles/style";
import { toast } from "react-toastify";
import { TfiGallery } from "react-icons/tfi";
import { format } from "timeago.js";
import socketIO from "socket.io-client";
const ENDPOINT = "http://localhost:5000/";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

const DashboardMessages = () => {
  const { seller } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setarrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [activeChatId, setActiveChatId] = useState(null);
  const [image, setImage] = useState();

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setarrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.participants?.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    axios
      .get(`${server}/conversation/get-seller-conversation/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setConversations(res.data.conversations);
      })
      .catch((error) => console.log(error));
  }, [seller]);

  // Get all messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${server}/message/get-all-messages/${currentChat._id}`
        );
        setMessages(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };

    if (seller?._id && currentChat) {
      getMessage();
    }
  }, [currentChat, seller?._id]);

  // Create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat?.participants?.find(
      (i) => i.id !== seller?._id
    );

    socket.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        const res = await axios.post(
          `${server}/message/create-message`,
          message
        );
        setMessages([...messages, res.data.message]);
        await updateLastMessage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socket.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: seller._id,
    });

    try {
      const res = await axios.put(
        `${server}/conversation/update-last-message/${currentChat._id}`,
        {
          lastMessage: newMessage,
          lastMessageId: seller._id,
        }
      );
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  // Online users
  useEffect(() => {
    if (seller) {
      const sellerId = seller?._id;
      console.log("seller", sellerId);

      socket.emit("addUser", sellerId);
      socket.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }

    console.log("onlineusers", onlineUsers);
  }, [seller]);

  //  online check function
  const onlineCheck = (chat) => {
    const chatMembers = chat.participants.find(
      (member) => member !== seller?._id
    );
    const online = onlineUsers.find((user) => user?.userId === chatMembers);
    return !!online;
  };

  // handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImage(file);

    imageSendingHandler(file);
  };

  const imageSendingHandler = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("sender", seller._id);
    formData.append("text", newMessage);
    formData.append("conversationId", currentChat._id);

    const receiverId = currentChat.participants.find(
      (member) => member !== seller._id
    );

    socket.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      image: file,
    });

    try {
      await axios
        .post(`${server}/message/create-message`, formData)
        .then((res) => {
          setImage();
          setMessages([...messages, res.data.message]);
          updateLastMessageForImage();
        });
    } catch (error) {
      toast.error(err.response.data.message);
    }
  };

  const updateLastMessageForImage = async () => {
    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: "photo",
        lastMessageId: seller._id,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-auto rounded">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-family-poppins">
            All Messages
          </h1>
          {/* messages list */}
          {conversations?.map((item, index) => (
            <MessageList
              data={item}
              index={index}
              key={index}
              setOpen={setOpen}
              setCurrentChat={setCurrentChat}
              me={seller._id}
              userData={userData}
              setUserData={setUserData}
              online={onlineCheck(item)}
              setActiveStatus={setActiveStatus}
              activeChatId={activeChatId}
              setActiveChatId={setActiveChatId}
            />
          ))}
        </>
      )}

      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={seller._id}
          userData={userData}
          activeStatus={activeStatus}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

const MessageList = ({
  data,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  online,
  setActiveStatus,
  activeChatId,
  setActiveChatId,
}) => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  console.log("online", online);

  const handleClick = (id) => {
    navigate(`/dashboard-messages?${id}`);
  };

  useEffect(() => {
    setActiveStatus(online);
    const userId = data.participants.find((user) => user !== me);
    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/user/user-info/${userId}`);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data, online, setActiveStatus, setUserData]);

  return (
    <div
      className={`w-full flex p-3 cursor-pointer ${
        activeChatId === data._id ? "bg-[#f2f1f1]" : "bg-transparent"
      }`}
      onClick={(e) => {
        setActiveChatId(data._id);
        handleClick(data._id);
        setOpen(true);
        setCurrentChat(data);
        setUserData(user);
        setActiveStatus(online);
      }}
    >
      <div className="relative">
        <img
          src={`${backend_url}/${user?.avatar}`}
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        {online ? (
          <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[4px] right-[0px]" />
        ) : null}
      </div>

      <div className="pl-3">
        <h1 className="pl-3 text-[18px]">{user?.name}</h1>
        <p className="text-[16px] text-[#000c]">
          {data?.lastMessageId !== user?._id
            ? "You: "
            : user?.name?.split("")[0] + ": "}
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
  handleImageUpload,
}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/* message header */}
      <div className="w-full flex p-3 items-center justify-between bg-slate-200">
        <div className="flex">
          <img
            src={
              userData?.avatar
                ? `${backend_url}/${userData.avatar}`
                : "/default-avatar.png"
            }
            alt="avatar"
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
            <h1>{activeStatus ? "Active Now" : ""}</h1>
          </div>
        </div>
        <AiOutlineArrowRight
          size={20}
          onClick={() => setOpen(false)}
          className="cursor-pointer"
        />
      </div>

      {/* messages */}
      <div className="px-3 h-[65vh] py-1 overflow-y-auto">
        {messages &&
          messages.map((item, index) => (
            <div
              key={index}
              className={`flex w-full my-2 ${
                item.sender === sellerId ? "justify-end" : "justify-start"
              }`}
            >
              {item.sender !== sellerId && (
                <img
                  src={`${backend_url}/${userData?.avatar}`}
                  alt=""
                  className="w-[40px] h-[40px] rounded-full mr-3"
                />
              )}

              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm leading-5 shadow-md ${
                  item.sender === sellerId
                    ? "bg-gray-200 text-gray-800 rounded-br-none"
                    : "bg-gray-100 text-gray-900 rounded-bl-none"
                }  ${item.image ? "bg-transparent shadow-none p-0" : ""}`}
              >
                {item.text && <p>{item.text}</p>}

                {item.image && (
                  <img
                    src={`${backend_url}/${item.image}`}
                    alt="sent"
                    className="w-[250px] h-[250px] rounded-lg object-cover mt-1"
                  />
                )}

                {/* Time */}
                <p className={`text-[11px] mt-1  text-gray-500 text-right`}>
                  {format(item.createdAt)}
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* send message input */}
      <form
        className="w-full relative flex justify-between items-center p-3"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[3%]">
          <input
            type="file"
            id="image"
            className="hidden"
            onChange={handleImageUpload}
          />
          <label htmlFor="image">
            <TfiGallery className="cursor-pointer" size={20} />
          </label>
        </div>
        <div className="w-[97%] ml-3">
          <input
            type="text"
            placeholder="Enter your message..."
            className={`${styles.input} `}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            required
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={20}
              className="absolute right-5 top-5 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default DashboardMessages;
