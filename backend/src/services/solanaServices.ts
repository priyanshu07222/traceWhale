import * as web3 from '@solana/web3.js'
import pLimit from 'p-limit';
import WebSocket from 'ws';

const connection =  new web3.Connection("https://mainnet.helius-rpc.com/?api-key=b55951f7-cd70-411d-8962-abbd2e2c7877", 'confirmed');
const limit = pLimit(1)



const getTransaction = async(wsServer: WebSocket.Server) => {
    connection.onLogs('all', async(logs) => {
        try {
            await limit(async() => {
                const signature = logs.signature;
                const amount = await getTransactionAmount(signature);
                if(Number(amount) > 1) {
                    console.log(`whale detected:`,amount);
                    notifyClients(wsServer, signature, Number(amount))
                }
            })
            
        } catch (error) {
            console.log('Error Processing transaction:', error)
        }
    })

}


const getTransactionAmount = async(signature: web3.TransactionSignature):Promise<Number> => {
    const confirmedTransaction = await connection.getParsedTransaction(signature, {maxSupportedTransactionVersion:0});
    if (!confirmedTransaction || !confirmedTransaction.meta) return 0;

    const {meta} = confirmedTransaction;
    const fees = meta.fee / 1e9;
    const amount = (meta.postBalances[0] - meta.preBalances[0])/1e9 - fees;
     return Math.abs(amount);
}

const notifyClients = (wsServer:WebSocket.Server, transactionSignature: string, amountInSol:number) => {
    wsServer.clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type:"whale_transaction",
                amountInSol,
                transactionSignature,
                amountInUSD: amountInSol * 270
            }))
        }
    })
}

export default getTransaction;

