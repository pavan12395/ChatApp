import React, {useState } from 'react';
import Home from './Home';
import Chat from './Chat';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import './App.css'; // Import your custom styles or CSS framework

const App = () => {
  const [dataChannel,setDataChannel] = useState(null);
  const [messages,setMessages] = useState([]);
  return (
    <Router>
        <Routes>
        <Route path="/" element={ <Home dataChannel={dataChannel} setDataChannel={setDataChannel}/> } />
        <Route path="/chat" element={<Chat dataChannel={dataChannel} setDataChannel={setDataChannel} messages={messages} setMessages={setMessages}/>}/>
      </Routes>
    </Router>);
};

export default App;
