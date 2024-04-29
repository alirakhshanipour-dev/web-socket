import { Server } from "socket.io";
import { CHANNEL_PUBLIC, EVENT_INFO, EVENT_MESSAGE } from "./constants.js";
const io = new Server(3000)

console.log("server is started");

io.on("connection", (socket) => {
    console.log("a client joined the server!");

    socket.join(CHANNEL_PUBLIC)
    socket.emit(EVENT_INFO, "welcome to socket.io")


    socket.on(EVENT_MESSAGE, ({ sender, message }) => {
        console.log(`[${sender}]: ${message}`);

        io.to(CHANNEL_PUBLIC).emit(EVENT_MESSAGE, { sender, message })
    })
})
