import React, { useEffect, useState } from "react";

import './App.css';
import { useNavigate } from "react-router-dom";

function generateUniqueId() {
    const timestamp = new Date().getTime();
    const randomNum = Math.random() * 1000000; // Adjust the range as needed
    const uniqueId = `${timestamp}-${randomNum}`;
  
    return uniqueId;
  }

export default function Chat({dataChannel,setDataChannel,messages,setMessages}) {
  const [sendMessage,setSendMessage] = useState("");
  const navigate = useNavigate();
  const sendMessageChangeHandler = (e)=>
  {
      e.preventDefault();
      setSendMessage(e.target.value);
  }
  useEffect(()=>
  {
     dataChannel.onmessage = (e)=>
     {
        const curr_message = {id:generateUniqueId(),content:e.data,recieved:true};
        console.log(messages);
        setMessages([...messages,curr_message]);
     }
  },[messages]);
  const sendHandler = (e)=>
  {
    e.preventDefault();
    const curr_message = {id:generateUniqueId(),content:sendMessage,recieved:false};
    setMessages([...messages,curr_message]);
    dataChannel.send(sendMessage);
    setSendMessage("");
  }
  return (
    <div className="messaging-container">
      <div className="messages-panel">
        {messages.map(message => (
          <div
            key={message.id}
            className={`message ${message.recieved ? 'received' : 'sent'}`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className="input-panel">
        <input type="text" placeholder="Type your message" value={sendMessage} onChange={sendMessageChangeHandler}/>
        <button onClick={sendHandler}>Send</button>
      </div>
    </div>
  );
}

