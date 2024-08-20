import { useEffect, useRef, useState } from "react";
import "./App.css";
import { connectToServer, sendToServer } from "./helper/socketClient";

function App() {
  const [status, setStatus] = useState("Offline");
  const [clients, setClients] = useState([]);
  const [messages, setMessages] = useState([]);
  const tokenRef = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();
    if (e.target[0].value.trim().length <= 0) return;
    sendToServer(e.target[0].value.trim());
    e.target[0].value = "";
  };

  const connect = (e) => {
    if (e.key == "Enter") {
      if (e.target.value.trim().length <= 0) return;
      connectToServer(
        setStatus,
        setClients,
        setMessages,
        e.target.value.trim()
      );
    }
  };

  return (
    <>
      <div>
        <h1>WebSocket</h1>
        <input
          ref={tokenRef}
          type="text"
          placeholder="add token"
          onKeyDown={(e) => {
            connect(e);
          }}
        />
        <span className={`${status == "Offline" ? "text-red" : "text-green"}`}>
          {status}
        </span>
        <ul>
          {clients.map((item, i) => {
            return (
              <li style={{ textAlign: "left" }} key={i}>
                {item}
              </li>
            );
          })}
        </ul>
        <form
          style={{ gap: "10px", display: "flex", flexDirection: "column" }}
          onSubmit={(e) => sendMessage(e)}
        >
          <input type="text" placeholder="send message" />
        </form>
        <ul>
          {messages.map((item, i) => {
            return (
              <li style={{ textAlign: "left" }} key={i}>
                {item.usuario}: {item.message}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
