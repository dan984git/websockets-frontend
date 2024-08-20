import { Manager } from "socket.io-client";
let manager;
let socket;

export const connectToServer = (setStatus, setClients, setMessages, token) => {
  manager = new Manager("http://localhost:3000/socket.io/socket.io.js", {
    extraHeaders: {
      authentication: token,
    },
  });
  socket?.removeAllListeners();
  socket = manager.socket("/");

  addListeners(setStatus, setClients, setMessages);
};

const addListeners = (setStatus, setClients, setMessages) => {
  socket.on("connect", () => {
    setStatus("Online");
  });
  socket.on("disconnect", () => {
    setStatus("Offline");
    setClients([]);
    setMessages([]);
  });
  socket.on("clients-updated", (clients) => {
    setClients(clients);
  });
  socket.on("message-from-server", ({ payload, usuario }) => {
    setMessages((prevState) => [
      ...prevState,
      { usuario, message: payload.message },
    ]);
  });
};

export const sendToServer = (value) => {
  socket = manager.socket("/");
  socket.emit("message-from-client", {
    message: value,
  });
};
