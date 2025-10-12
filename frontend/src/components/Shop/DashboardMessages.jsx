import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import { toast } from "react-toastify";
import { format } from "timeago.js";
import socketIO from "socket.io-client";
import { server } from "../../server";
import styles from "../../styles/style";

const ENDPOINT = "https://socket-server-1-8lpl.onrender.com/";
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

  //  Socket listeners
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
    if (
      arrivalMessage &&
      currentChat?.participants?.includes(arrivalMessage.sender)
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  //  Fetch all conversations
  useEffect(() => {
    axios
      .get(`${server}/conversation/get-seller-conversation/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => setConversations(res.data.conversations))
      .catch(console.log);
  }, [seller]);

  //  Fetch messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get(
          `${server}/message/get-all-messages/${currentChat._id}`
        );
        setMessages(res.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    if (seller?._id && currentChat) getMessage();
  }, [currentChat, messages]);

  // Send message
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

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
      const res = await axios.post(`${server}/message/create-message`, message);
      setMessages([...messages, res.data.message]);
      await updateLastMessage();
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
      await axios.put(
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
      socket.emit("addUser", seller._id);
      socket.on("getUsers", (data) => setOnlineUsers(data));
    }
  }, [seller]);

  const onlineCheck = (chat) => {
    const member = chat.participants.find((m) => m !== seller?._id);
    return !!onlineUsers.find((u) => u.userId === member);
  };

  //Image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    imageSendingHandler(file);
  };

  const imageSendingHandler = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("sender", seller._id);
    formData.append("conversationId", currentChat._id);

    const receiverId = currentChat.participants.find((m) => m !== seller._id);
    socket.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      image: file,
    });

    try {
      const res = await axios.post(
        `${server}/message/create-message`,
        formData
      );
      setMessages([...messages, res.data.message]);
      await updateLastMessageForImage();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const updateLastMessageForImage = async () => {
    await axios.put(
      `${server}/conversation/update-last-message/${currentChat._id}`,
      {
        lastMessage: "photo",
        lastMessageId: seller._id,
      }
    );
  };

  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] rounded shadow-md overflow-hidden">
      {!open && (
        <>
          <h1 className="text-center text-[26px] font-semibold py-4 text-[#2D6A4F] border-b">
            All Messages
          </h1>

          <div className="overflow-y-auto h-[75vh] divide-y divide-gray-100">
            {conversations?.map((item, index) => (
              <MessageList
                key={index}
                data={item}
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
          </div>
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

  useEffect(() => {
    setActiveStatus(online);
    const userId = data.participants.find((u) => u !== me);
    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/user/user-info/${userId}`);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data, online]);

  return (
    <div
      onClick={() => {
        setActiveChatId(data._id);
        navigate(`/dashboard-messages?${data._id}`);
        setOpen(true);
        setCurrentChat(data);
        setUserData(user);
        setActiveStatus(online);
      }}
      className={`flex items-center gap-4 p-4 cursor-pointer transition ${
        activeChatId === data._id ? "bg-[#e8f5e9]" : "hover:bg-gray-50"
      }`}
    >
      <div className="relative">
        <img
          src={user?.avatar?.url || "/default-avatar.png"}
          alt="avatar"
          className="w-[55px] h-[55px] rounded-full border border-gray-200 object-cover"
        />
        {online && (
          <div className="absolute bottom-1 right-1 w-[12px] h-[12px] bg-green-500 border-2 border-white rounded-full" />
        )}
      </div>

      <div className="flex flex-col w-full">
        <h1 className="text-[17px] font-medium text-gray-800">{user?.name}</h1>
        <p className="text-[14px] text-gray-600 truncate">
          {data?.lastMessageId !== user?._id ? "You: " : ""}
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
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-[#2D6A4F] text-white flex items-center justify-between px-4 py-3 shadow-md">
        <div className="flex items-center gap-3">
          <img
            src={userData?.avatar?.url || "/default-avatar.png"}
            alt="avatar"
            className="w-[50px] h-[50px] rounded-full border-2 border-white"
          />
          <div>
            <h1 className="text-lg font-semibold">{userData?.name}</h1>
            {activeStatus && (
              <span className="text-xs text-[#FFD166] font-medium">Online</span>
            )}
          </div>
        </div>
        <AiOutlineArrowRight
          size={22}
          onClick={() => setOpen(false)}
          className="cursor-pointer text-[#FFD166] hover:text-white"
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 bg-[#f9fafb] space-y-3">
        {messages.map((item, index) => (
          <div
            key={index}
            className={`flex w-full ${
              item.sender === sellerId ? "justify-end" : "justify-start"
            }`}
          >
            {item.sender !== sellerId && (
              <img
                src={userData?.avatar?.url}
                alt=""
                className="w-[35px] h-[35px] rounded-full mr-2"
              />
            )}

            <div className="flex flex-col max-w-[75%]">
              {item.text && (
                <div
                  className={`rounded-2xl px-4 py-2 text-sm mb-1 ${
                    item.sender === sellerId
                      ? "bg-[#6cad90] text-white"
                      : "bg-[#FFD166]/60 text-gray-800"
                  }`}
                >
                  {item.text}
                </div>
              )}

              {item.image?.url && (
                <img
                  src={item.image.url}
                  alt="sent"
                  className="w-[250px] h-[250px] rounded-lg object-cover border border-gray-200"
                />
              )}

              <p className="text-[11px] mt-1 text-gray-500 text-right">
                {format(item.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessageHandler}
        className="flex items-center p-3 border-t bg-white shadow-inner"
      >
        <input
          type="file"
          id="image"
          className="hidden"
          onChange={handleImageUpload}
        />
        <label htmlFor="image" className="cursor-pointer text-[#2D6A4F]">
          <TfiGallery size={22} />
        </label>
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 mx-3 focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          required
        />
        <button type="submit" className="text-[#2D6A4F] hover:text-[#FFD166]">
          <AiOutlineSend size={22} />
        </button>
      </form>
    </div>
  );
};

export default DashboardMessages;
