const socketIO = require("socket.io");
const http = require("http");
const express = require("express");

const cors = require("cors");
const app = express();
const server = http.createServer(app);

require("dotenv").config({
  path: "./.env",
});

const io = socketIO(server);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

let users = [];
const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

// Define a message format
const createMessage = ({ senderId, recieverId, text, images }) => ({
  senderId,
  recieverId,
  text,
  images,
  seen: false,
});

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (recieverId) => {
  return users.find((user) => user.userId === recieverId);
};

io.on("connection", (socket) => {
  console.log("a user is connected!");

  // take useId and socketid
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    // event to all connected clients -> online clients list
    io.emit("getUsers", users);
  });

  // get and send messages
  const messages = {}; // object to track messages send to each user
  socket.on("sendMessage", ({ senderId, recieverId, text, images }) => {
    const message = createMessage({ senderId, recieverId, text, images });

    const user = getUser(recieverId);

    // store the messages in the "messages object"
    if (!messages[recieverId]) {
      messages[recieverId] = [message];
    } else {
      messages[recieverId].push(message);
    }

    // send message to receiver
    io.to(user?.socketId).emit("getMessage", message);
  });

  socket.on("messageSeen", ({ senderId, recieverId, messageId }) => {
    const user = getUser(senderId);

    // update the seen flag
    if (messages[senderId]) {
      const message = messages[senderId].find(
        (message) =>
          message.recieverId === recieverId && message.id === messageId
      );

      if (message) {
        message.seen = true;
      }
    }
  });

  // update and get last message
  socket.on("updateLastMessage", ({ lastMessage, lastMessageId }) => {
    io.emit("getLastMessage", {
      lastMessage,
      lastMessageId,
    });
  });

  // disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`server is running on new port: ${process.env.PORT}`);
});
