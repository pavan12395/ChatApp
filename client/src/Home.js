import React from 'react';
import { useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home({dataChannel,setDataChannel})
{
  const [localSDP, setLocalSDP] = useState('');
  const [remoteSDP, setRemoteSDP] = useState('');
  const [sendConnection,setSendConnection] = useState(null);
  const [recieveConnection,setRecieveConnection] = useState(null);
  const navigate = useNavigate();
  const navigateToChat = ()=>
  {
      navigate("/Chat");
  }
    function initSendConnection()
    {
    const connection = new RTCPeerConnection();
    connection.onicecandidate = (e)=>
    {
       setLocalSDP(JSON.stringify(connection.localDescription));
    }
    const sendChannel = connection.createDataChannel("sendChannel");
    sendChannel.onopen = e => navigateToChat();
    sendChannel.onclose =e => console.log("closed!!!!!!");
    setDataChannel(sendChannel);
    connection.createOffer().then(o => connection.setLocalDescription(o)).then(()=>
    {
        setLocalSDP(JSON.stringify(connection.localDescription));
    });
    return connection;
}

async function initRecieveConnection(remoteOffer)
{
  const remoteConnection = new RTCPeerConnection()

  remoteConnection.onicecandidate = e =>  {
    setLocalSDP(JSON.stringify(remoteConnection.localDescription));
  }
      remoteConnection.ondatachannel= e => {
        const receiveChannel = e.channel;
        receiveChannel.onopen = e => navigateToChat();
        receiveChannel.onclose =e => console.log("closed!!!!!!");
        setDataChannel(receiveChannel);
        remoteConnection.channel = receiveChannel;
  
  }
  remoteConnection.setRemoteDescription(remoteOffer).then(a=>console.log("done"))
  //create answer
  await remoteConnection.createAnswer().then(a => remoteConnection.setLocalDescription(a)).then(()=>
  {
    setLocalSDP(JSON.stringify(remoteConnection.localDescription));
  })
  return remoteConnection;
}
  useEffect(()=>
  {
    setSendConnection(initSendConnection());
  },[]);
  const handleConnect = (e) => {
     e.preventDefault();
     const parsedRemoteSDP = JSON.parse(remoteSDP);
     if(parsedRemoteSDP.type == "offer")
     {
         setRecieveConnection(initRecieveConnection(parsedRemoteSDP));
     }
     else if(parsedRemoteSDP.type == "answer")
     {
        sendConnection.setRemoteDescription(parsedRemoteSDP);
     }
  };

  return (
    <div className="container">
      <h1>WebRTC Chat Application</h1>
      <div className="input-container">
        <label htmlFor="localSDP">Local SDP:</label>
        <input
          type="text"
          id="localSDP"
          value={localSDP}
        />
      </div>
      <div className="input-container">
        <label htmlFor="remoteSDP">Remote SDP:</label>
        <input
          type="text"
          id="remoteSDP"
          value={remoteSDP}
          onChange={(e) => setRemoteSDP(e.target.value)}
        />
      </div>
      <button className="connect-button" onClick={handleConnect}>
        Connect
      </button>
    </div>
  );
}