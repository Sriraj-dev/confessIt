const http = require('http');
const express =  require('./rest.js')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://gautam:gautam@cluster0.uuxyzsp.mongodb.net/campusecho?retryWrites=true&w=majority').then(()=>{
    console.log("Connected with MongoDB Database");
}).catch(()=>{
    console.log("Error in connection with MongoDB Database")
})

const server = http.createServer(express);

//connecting with the mongoDB database here!!


server.listen(3000);