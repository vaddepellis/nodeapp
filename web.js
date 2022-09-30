var express = require('express');
var app = express();
const Socket = require("websocket").server
const http = require("http") 
const expressip = require('express-ip');
const server = http.createServer(app)
app.use(expressip().getIpInfoMiddleware)
const PORT = process.env.PORT ||4000
    server.listen(PORT, function() {
        console.log('listening to port 4000')
        
    });
// Set EJS as templating engine
app.set('view engine', 'ejs');
app.use(express.static('public'))


app.get('/', (req, res)=>{
    
    res.render('sender', {ip_address:req.ipInfo.ip});
     
    });
app.get('/receiver', (req, res)=>{
    
        res.render('receiver', {ip_address:req.ipInfo.ip});
         
        });

        
        
const webSocket = new Socket({ httpServer: server })

let users = []

webSocket.on('request', (req) => {
    const connection = req.accept()

    connection.on('message', (message) => {
        const data = JSON.parse(message.utf8Data)

        const user = findUser(data.username)

        switch(data.type) {
            case "store_user":

                if (user != null) {
                    return
                }

                const newUser = {
                     conn: connection,
                     username: data.username
                }

                users.push(newUser)
                console.log(newUser.username)
                break
            case "store_offer":
                if (user == null)
                    return
                user.offer = data.offer
                break
            
            case "store_candidate":
                if (user == null) {
                    return
                }
                if (user.candidates == null)
                    user.candidates = []
                
                user.candidates.push(data.candidate)
                break
            case "send_answer":
                if (user == null) {
                    return
                }

                sendData({
                    type: "answer",
                    answer: data.answer
                }, user.conn)
                break
            case "send_candidate":
                if (user == null) {
                    return
                }

                sendData({
                    type: "candidate",
                    candidate: data.candidate
                }, user.conn)
                break
            case "join_call":
                if (user == null) {
                    return
                }

                sendData({
                    type: "offer",
                    offer: user.offer
                }, connection)
                
                user.candidates.forEach(candidate => {
                    sendData({
                        type: "candidate",
                        candidate: candidate
                    }, connection)
                })

                break
        }
    })

    connection.on('close', (reason, description) => {
        users.forEach(user => {
            if (user.conn == connection) {
                users.splice(users.indexOf(user), 1)
                return
            }
        })
    })
})

function sendData(data, conn) {
    conn.send(JSON.stringify(data))
}

function findUser(username) {
    for (let i = 0;i < users.length;i++) {
        if (users[i].username == username)
            return users[i]
    }
}

    

// const express = require('express')
// const app = express()
// const Socket = require("websocket").server
// const http = require("http")

// const server = http.createServer((req, res) => {})
// const PORT = process.env.PORT ||3000


// server.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}...`)
// })










// // // Importing express module
// // const express = require('express');
// // const app = express();

// // // Getting Request
// // app.get('/', (req, res) => {

// // 	// Sending the response
// // 	res.send('Hello World!')
	
// // 	// Ending the response
// // 	res.end()
// // })
// // app.get('/home',(req,res) =>{
// //   res.send('Welcome to home page')
// // })

// // // Establishing the port
// // const PORT = process.env.PORT ||5000;

// // // Executing the server on given port number
// // app.listen(PORT, console.log(
// // `Server started on port ${PORT}`));
