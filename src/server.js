//const express = require('express');
import express from 'express'; 
const server = express();
import routesPayment from './routes/payment.routes.js'

const PORT = process.env.PORT || 3000;

server.use(express.json());

server.use("/api", routesPayment);

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});