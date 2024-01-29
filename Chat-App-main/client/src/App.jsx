import './App.css'
import {useEffect, useState} from "react";
import io from 'socket.io-client';
import Chat from './component/Chat';

const socket=io.connect("http://localhost:3001");

function App() {
  const[username,setUsername]=useState("");
  const[room_id,setRoomId]=useState("");
  const[showChat,setShowChat]=useState(false);
  const handleOnSubmitForm=(e)=>{
    e.preventDefault();
    if(username!==""&&room_id!==""){
      socket.emit("join_room",room_id);
      setShowChat(true);
    }
  }
  
   
  return (

    <div className="App">

     {!showChat?(<div className="joinChatContainer">
     `<h3>Join A Chat</h3>
      <form onSubmit={handleOnSubmitForm}>
      <input type="text" name="username" placeholder='username' onChange={(e)=>setUsername(e.target.value)}/>
      <input style={{"marginLeft":"20px"}} type="text" name="room_id" placeholder='room id..' onChange={(e)=>setRoomId(e.target.value)} />
      <button style={{"marginLeft":"20px"}}>submit</button>
      </form>

    </div>):
      <Chat socket={socket} username={username} room={room_id}/>}
    </div>
  )
}
export default App
