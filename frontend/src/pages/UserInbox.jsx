import { useEffect, useRef, useState } from "react";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import socketIO from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import { server } from "../server";
const ENDPOINT = "https://socket-server-1-8lpl.onrender.com/";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

const UserInbox = () => {
  const { user } = useSelector((state) => state.user);
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
    const getConversation = async () => {
      try {
        const response = await axios.get(
          `${server}/conversation/get-user-conversation/${user?._id}`,
          {
            withCredentials: true,
          }
        );
        setConversations(response.data.conversations);
      } catch (error) {
        console.log(error);
      }
    };

    if (user?._id) {
      getConversation();
    }
  }, [user]);

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

    if (user?._id && currentChat) {
      getMessage();
    }
  }, [currentChat, user?._id]);

  // Create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat?.participants?.find((i) => i !== user?._id);

    socket.emit("sendMessage", {
      senderId: user._id,
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
      lastMessageId: user._id,
    });

    try {
      const res = await axios.put(
        `${server}/conversation/update-last-message/${currentChat._id}`,
        {
          lastMessage: newMessage,
          lastMessageId: user._id,
        }
      );

      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  // Online users
  useEffect(() => {
    if (user) {
      const userId = user?._id;

      socket.emit("addUser", userId);
      socket.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.participants.find(
      (member) => member !== user?._id
    );
    const online = onlineUsers.find(
      (onlineUser) => onlineUser.userId === chatMembers
    );

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
    formData.append("sender", user._id);
    formData.append("text", newMessage);
    formData.append("conversationId", currentChat._id);

    const receiverId = currentChat.participants.find(
      (member) => member !== user._id
    );

    socket.emit("sendMessage", {
      senderId: user._id,
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
      console.log(error);
    }
  };

  const updateLastMessageForImage = async () => {
    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: "photo",
        lastMessageId: user._id,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="w-full">
      {!open && (
        <>
          <Header />
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
              me={user._id}
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
        <UserInboxChat
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          userId={user._id}
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
  index,
  setOpen,
  setCurrentChat,
  me,
  userData,
  setUserData,
  online,
  setActiveStatus,
  activeChatId,
  setActiveChatId,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const handleClick = (id) => {
    navigate(`?${id}`);
  };

  useEffect(() => {
    setActiveStatus(online);
    const userId = data.participants.find((user) => user != me);
    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/shop/get-shop-info/${userId}`);
        setUser(res?.data?.shop);
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
          src={user?.avatar?.url}
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
            : user?.name?.split(" ")[0] + ": "}
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

//  UserInboxChat component
const UserInboxChat = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  userId,
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
              userData?.avatar?.url
                ? userData.avatar.url
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
      <div className="px-3 h-[80vh] py-1 overflow-y-auto">
        {messages &&
          messages.map((item, index) => (
            <div
              key={index}
              className={`flex w-full my-2 ${
                item.sender === userId ? "justify-end" : "justify-start"
              }`}
            >
              {item.sender !== userId && (
                <img
                  src={userData?.avatar?.url}
                  alt=""
                  className="w-[40px] h-[40px] rounded-full mr-3"
                />
              )}

              {item.text !== "" && (
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm leading-5 shadow-md ${
                    item.sender === userId
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-black rounded-bl-none"
                  }`}
                >
                  <p>{item.text}</p>
                  <p className="text-[11px] mt-1 text-gray-600 text-right">
                    {format(item.createdAt)}
                  </p>
                </div>
              )}

              {item.image.url != null && (
                <div className="max-w-[70%]">
                  <img
                    src={item?.image?.url}
                    alt="sent"
                    className="w-[250px] h-[250px] rounded-lg object-cover"
                  />
                  <p className="text-[11px] mt-1 text-gray-600 text-right">
                    {format(item.createdAt)}
                  </p>
                </div>
              )}
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
            className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
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

export default UserInbox;
