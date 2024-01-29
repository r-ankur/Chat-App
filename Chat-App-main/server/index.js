const express=require('express')
const app=express()
const http=require("http");
const {Server}=require("socket.io");
const cors=require("cors")

app.use(cors());

const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:['GET','POST']
    }
});


io.on("connection", (socket)=>{
    // console.log(`socket id is: ${socket.id}`);
    socket.on("join_room",(data)=>{
        console.log(`user joined the socket: ${socket.id} with  room_id:${data}`);
    })

    socket.on("send_message", (data)=>{
        // console.log("send-message",data);
        socket.broadcast.emit("receive_message",data);
    })

    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id);
    })

})


server.listen(3001,()=>{
    console.log("server started at port 3001");
})


