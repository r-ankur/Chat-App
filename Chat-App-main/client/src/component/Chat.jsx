import React, {useState,useEffect} from 'react'

function Chat({socket,username,room}) {

    const [message,setMessage]=useState("");
    const [messageList,setMessageList]=useState([]);
    const handleSendMessage=async ()=>{
        setMessage("");
        const data={
            room,
            author:username,message,
            socket_id:socket.id,
            time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
        }
        await socket.emit("send_message",data);
        setMessageList((prev)=>[...prev,data]);
    }

    useEffect(()=>{
        socket.on("receive_message",(data)=>{
          
          setMessageList((prev)=>[...prev,data]);
        })
      },[])
     
  return (
    <div className="chat-window">

      <div className="chat-header"></div>
      <div className="chat-body">
        {
            messageList.map((data_mes)=>{
                return (
                    <div className="message" id={username===data_mes.author?"you":"other"}>
                      <div>
                        <div className="message-content">
                          <p>{data_mes.message}</p>
                        </div>
                        <div className="message-meta">
                          <p>{data_mes.time}</p>
                          <p>{data_mes.author}</p>
                        </div>
                      </div>
                    </div>
                )
            })
        }
      </div>
      <div className="chat-footer">
        <input  type='text' placeholder='message' value={message} onChange={(e)=>setMessage(e.target.value)} ></input>
        <button onClick={handleSendMessage}>⬆️</button>
      </div>
    </div>
  )
}

export default Chat
