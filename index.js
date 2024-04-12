const express = require("express");
//import express from 'express';
const cors = require("cors");
const mongoose = require('mongoose');
const userRoutes =require("./routes/userRoutes");
const messageRoutes = require("./routes/messagesRoute");

//const mongo_url = "mongodb+srv://Rahul:Rahul%40120224@cluster0.nftogak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongo_url2 = "mongodb://Rahul:Rahul%40120224@ac-x4p9t6v-shard-00-00.nftogak.mongodb.net:27017,ac-x4p9t6v-shard-00-01.nftogak.mongodb.net:27017,ac-x4p9t6v-shard-00-02.nftogak.mongodb.net:27017/?replicaSet=atlas-uls6xl-shard-0&ssl=true&authSource=admin"


const app = express();

const socket = require("socket.io")

require("dotenv").config();

//const server = app.listen();

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes);
app.use("/api/message",messageRoutes);

mongoose.connect(mongo_url2,{
     useNewUrlParser : true,
     useUnifiedTopology : true,
}).then(()=>{
  console.log("DB connect successfully");
}).catch((err)=>{
     console.log(err);
});

const server = app.listen(process.env.PORT,() =>{
     console.log("Server Started on Port" + " "+process.env.PORT);
})

const io = socket(server,{
     cors:{
          origin:"http://localhost:3000",
          credentials:true,
     },
});

global.onlineUsers = new Map();

io.on("connection",(socket)=>{
     global.chatSocket = socket;
     socket.on("add-user",(userId)=>{
           onlineUsers.set(userId,socket.id);
     });
     socket.on("send-msg",(data)=>{
          const sendUserSocket = onlineUsers.get(data.to);
          if(sendUserSocket){
               socket.to(sendUserSocket).emit("msg-recieve",data.message);
          }
     });
});