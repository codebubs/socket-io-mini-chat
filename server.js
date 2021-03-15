//Customizable vars
const port = 3000;

//Main code
const app = require('express')();
const http = require('http').createServer(app)
const io = require('socket.io')(http);

app.get('/', (_req, res) => {
    res.sendFile(__dirname + '\\index.html')
})

io.on('connection', (socket) => {
    console.log('Connected')
    socket.on('disconnect', () => {
        console.log("Disconnection")
    })
    socket.on('chat message', (msg) => {
        console.log('Message Sent: ' + msg);
        io.emit('chat message', msg);
    })
})

http.listen(port, () => {
    console.log('Listening on port ' + port);
    require('child_process').spawn('explorer.exe', ['http://localhost:' + port])
})