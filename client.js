import readline from "readline/promises"
import { io } from "socket.io-client";
import { EVENT_INFO, EVENT_MESSAGE } from "./constants.js";
import { stdin as input, stdout as output } from "process"


function setupSocket() {
    const socket = io("ws://localhost:3000")

    socket.on("connect", () => {
        console.log("connected to server/n");
    })

    socket.on(EVENT_INFO, (message) => {
        console.log("[server info]: ", message);
    })

    socket.on(EVENT_MESSAGE, ({ sender, message }) => {
        console.log(`[${sender}]: ${message}`);
    })

    return socket
}

async function getInput(rl, socket, sender) {
    const message = await rl.question("")

    output.moveCursor(0, -1)
    output.clearLine()

    socket.emit(EVENT_MESSAGE, { sender, message })



    await getInput(rl, socket, sender)
}


async function main() {
    const rl = readline.createInterface({ input, output })

    const fullname = await rl.question("Fullname: ")
    const socket = setupSocket()

    getInput(rl, socket, fullname)
}


main()