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

  const navigate = useNavigate();

  // incoming messages
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

  // all user conversations
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

    if (user?._id) getConversation();
  }, [user]);

  // get all messages
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

    if (user?._id && currentChat) getMessage();
  }, [currentChat, messages]);

  // send message
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
      await axios.put(
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

  // online users logic (unchanged)
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

  // image upload
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
      .then((res) => toast.success(res.data.message))
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <div className="w-full min-h-screen bg-white overflow-y-auto">
      {!open ? (
        <>
          <Header />
          <div className="flex items-center gap-3 px-4 py-3 border-b bg-white sticky top-0 z-10">
            <AiOutlineArrowRight
              size={22}
              className="rotate-180 text-[#2D6A4F] cursor-pointer hover:text-[#22543d]"
              onClick={() => navigate(`/profile`)}
            />
            <h1 className="text-[22px] font-semibold text-gray-800">
              All Messages
            </h1>
          </div>

          {/* simple full-width message list */}
          <div className="w-full border-t border-gray-200">
            {conversations?.map((item, index) => (
              <MessageList
                key={index}
                data={item}
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
          </div>
        </>
      ) : (
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

// Message List Item
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
  }, [me, data, online, setActiveStatus]);

  return (
    <div
      className={`w-full flex items-center px-4 py-3 cursor-pointer border-b border-gray-100 hover:bg-gray-50 ${
        activeChatId === data._id ? "bg-gray-100" : "bg-white"
      }`}
      onClick={() => {
        setActiveChatId(data._id);
        setOpen(true);
        setCurrentChat(data);
        setUserData(user);
        setActiveStatus(online);
      }}
    >
      <div className="relative">
        <img
          src={user?.avatar?.url || "/default-avatar.png"}
          alt=""
          className="w-[50px] h-[50px] rounded-full border"
        />
        {online && (
          <div className="absolute bottom-1 right-1 w-[12px] h-[12px] bg-green-500 border-2 border-white rounded-full"></div>
        )}
      </div>

      <div className="ml-3 w-full">
        <h1 className="font-medium text-gray-800">{user?.name}</h1>
        <p className="text-sm text-gray-500 truncate">
          {data?.lastMessageId !== user?._id ? "You: " : ""}
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

// Chat Component
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
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-screen bg-white overflow-hidden">
      {/* ✅ Fixed Header */}
      <div className="sticky top-0 bg-[#2D6A4F] text-white z-20 flex items-center justify-between px-4 py-3 shadow-md">
        <div className="flex items-center gap-3">
          <img
            src={userData?.avatar?.url || "/default-avatar.png"}
            alt="avatar"
            className="w-[45px] h-[45px] rounded-full border-2 border-white"
          />
          <div>
            <h1 className="font-semibold text-white">{userData?.name}</h1>
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

      {/* ✅ Scrollable Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[#f9fafb]">
        {messages.map((item, index) => (
          <div
            key={index}
            className={`flex w-full ${
              item.sender === userId ? "justify-end" : "justify-start"
            }`}
          >
            {item.sender !== userId && (
              <img
                src={userData?.avatar?.url}
                alt=""
                className="w-[35px] h-[35px] rounded-full mr-2"
              />
            )}

            <div className="flex flex-col max-w-[75%]">
              {/* ✅ Text bubble */}
              {item.text && (
                <div
                  className={`rounded-2xl px-4 py-2 text-sm mb-1 ${
                    item.sender === userId
                      ? "bg-[#6cad90] text-white"
                      : "bg-[#FFD166]/70 text-gray-800"
                  }`}
                >
                  {item.text}
                </div>
              )}

              {/* ✅ Image without background */}
              {item.image?.url && (
                <img
                  src={item.image.url}
                  alt="sent"
                  className="w-[250px] h-[250px] rounded-lg object-cover border border-gray-200"
                />
              )}

              {/* ✅ Time below each message/image */}
              <p className="text-[11px] mt-1 text-gray-500 text-right">
                {format(item.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* ✅ Input Section */}
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

export default UserInbox;
