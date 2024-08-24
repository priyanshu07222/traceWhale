import * as web3 from '@solana/web3.js';
import getAllTrackedAddress from '../utils/getAlltrackedAddress';
import { getUserEmailWithUserId } from '../utils/getAllUser';
import { SendmailTrackedAddress } from './emailService';

const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');

async function trackAddress(userId: number) {
    if (!userId || typeof userId !== 'number') {
        console.error("Invalid userId provided.");
        return;
    }

    const trackedAddress = await getAllTrackedAddress(userId);
    if (!trackedAddress || trackedAddress.length === 0) {
        console.error("No tracked addresses found for user.");
        return;
    }

    trackedAddress.forEach(async (address) => {
        const key = address.accountAddress;
        const publicKey = new web3.PublicKey(key);
        try {
            console.log(`Tracking transactions for address: ${key}`);
        
            // Subscribe to account changes for the specified address
            try {
                connection.onAccountChange(publicKey, async (accountInfo, context) => {
                    console.log("Account info changed:", accountInfo);
            
                    // Fetch the latest transaction signatures for the tracked address
                    const transactionSignatures = await connection.getSignaturesForAddress(publicKey, {
                        limit: 1,
                    });
    
                    for (const signatureInfo of transactionSignatures) {
                        console.log(`Transaction Signature: ${signatureInfo.signature}`);
            
                        // Fetch the transaction details using the signature
                        const transactionDetails = await connection.getTransaction(signatureInfo.signature, {
                            maxSupportedTransactionVersion: 0,
                        });
            
                        if (transactionDetails) {
                            await SendmailTrackedAddress(signatureInfo.signature, key, userId);
                            console.log("Transaction details:", transactionDetails);
                        }
                    }
                });
            } catch (error) {
                console.log(error)
            }
        
        } catch (error) {
            console.error(`Error tracking address ${key}:`, error);
        }
    });

    console.log('Listening for changes...');
}


export default trackAddress;