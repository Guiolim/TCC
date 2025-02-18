//const express = require('express');
import express from 'express'; 
const server = express();

const PORT = process.env.PORT || 3000;

server.get("/",(req,res)=>{
    res.send("Hello World " + new Date() );
});

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});