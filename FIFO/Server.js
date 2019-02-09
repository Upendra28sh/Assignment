const express = require('express')
const server = express();

server.use(express.json())
server.use(express.urlencoded({extended: true}))

server.use('/', express.static(__dirname + "/public"))

server.listen(2345)
{
    console.log("Server Started on port 2345")
}