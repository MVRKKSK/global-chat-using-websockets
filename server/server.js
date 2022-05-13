const { raw } = require("express");
const express = require("express")
const {WebSocketServer}  = require("ws")
const app = express()

const PORT = 5000

const wss = new WebSocketServer({ port:5001 , clientTracking: true });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {

    const rawmessage = Buffer.from(data).toString()

    
    try{
      const {sender , message} = JSON.parse(rawmessage)
      
      for(const client of wss.clients){
        client.send(JSON.stringify({
          sender , message
        }))
      }
    }
    catch(err){
      //dont crash the server
    }


  });

  ws.send(JSON.stringify({
    sender : "system",
    message: "connection established"
  }));
});

app.use(express.static('public'))

app.get("/" , (req , res) => {
    res.send("Hello Admin")
})

app.listen(PORT , (req , res) => {
    console.log(`server is listening to ${PORT}`)
})