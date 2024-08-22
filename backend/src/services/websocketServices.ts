import WebSocket from "ws";
import getTransaction from "./solanaServices";
const wsConnectionUrl = 'wss://api.mainnet-beta.solana.com'

const wss = new WebSocket(wsConnectionUrl);

wss.on('connection', (ws) => {
    console.log("client connected");

    ws.on('message', (message:any) => {
        console.log(`Recieved message`, message)
    })

    ws.on('close', () => {
        console.log('Client disconnected.');
    });
})

// getTransaction()

