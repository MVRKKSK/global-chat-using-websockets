const ws = new WebSocket(`ws://${window.location.hostname}:5001`)

ws.addEventListener("open", connectionLog)
ws.addEventListener("message", messageHandler)

const username = localStorage.getItem("username") || prompt("What should be your username? ") || 'anonymous'

localStorage.setItem("username" , username)

function manojhandler({ sender, message }) {

    const div = document.createElement('div')

    const senderdiv = document.createElement('div')
    senderdiv.textContent = sender
    senderdiv.className = "sender"

    const messagediv = document.createElement('div')
    messagediv.textContent = message
    messagediv.className = "message"

    div.appendChild(senderdiv)
    div.appendChild(messagediv)

    document.getElementById("chat").appendChild(div)

}

function messageHandler(e) {
    try {

        console.log(e.data)
        const realmessage = JSON.parse(e.data)
        const { sender, message } = realmessage

        console.log(sender)

        manojhandler({sender  , message})

    }
    catch (error) {

    }
}

function connectionLog() {
    console.log("connection of websocket established successfully")
}

const handlesubmit = (e) => {
    e.preventDefault()
    // console.log("command ran")
    if(ws.readyState===WebSocket.OPEN){
        const feild = document.getElementById("message-included")

        const message = feild.value
        feild.value = ''
    
        console.log(`here is the message ${message}`)

        ws.send(JSON.stringify({
            sender: username,
            message
        }))
    }
    else{
        console.log("Server is still establishing")
    }



    
}
