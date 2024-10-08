import * as web3 from '@solana/web3.js'
import pLimit from 'p-limit';
import Sendmail from './emailService';

const rpcEndpoint = process.env.RPC_ENDPOINT

const connection =  new web3.Connection(rpcEndpoint!, 'confirmed');
const limit = pLimit(1)


const getTransaction = async() => {
    connection.onLogs('all', async(logs) => {
        try {
            await limit(async() => {
                const signature = logs.signature;
                const amount = await getTransactionAmount(signature);
                if(Number(amount) > 10) {
                    Sendmail(Number(amount), signature)
                    console.log(`whale detected:`,amount);
                }
            })
            
        } catch (error) {
            console.log('Error Processing transaction:', error)
        }
    })

}


export const getTransactionAmount = async(signature: web3.TransactionSignature):Promise<number> => {
    const confirmedTransaction = await connection.getParsedTransaction(signature, {maxSupportedTransactionVersion:0});
    if (!confirmedTransaction || !confirmedTransaction.meta) return 0;

    const {meta} = confirmedTransaction;
    const fees = meta.fee / 1e9;
    const amount = (meta.postBalances[0] - meta.preBalances[0])/1e9 - fees;
     return Math.abs(amount);
}




export default getTransaction;

