import * as web3 from '@solana/web3.js';
import getAllTrackedAddress from '../utils/getAlltrackedAddress';
import { getUserEmailWithUserId } from '../utils/getAllUser';
import { SendmailTrackedAddress } from './emailService';
import { getTransactionAmount } from './solanaServices';
import pLimit from 'p-limit';

const connection = new web3.Connection(
    "https://devnet.helius-rpc.com/?api-key=b55951f7-cd70-411d-8962-abbd2e2c7877",
    'confirmed'
);
const limit = pLimit(1);
let processingOnAccountChange = false;

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
        const amount = address.amount;
        const publicKey = new web3.PublicKey(key);

        try {
            // console.log(`Tracking transactions for address: ${key}`);

            // Subscribe to account changes for the specified address
            connection.onAccountChange(publicKey, async (accountInfo, context) => {
                if (!processingOnAccountChange) {
                    processingOnAccountChange = true; // Prevent further executions
                    // console.log("Account info changed:", accountInfo);

                    try {
                        await limit(async () => {
                            // Fetch the latest transaction signatures for the tracked address
                            const transactionSignatures = await connection.getSignaturesForAddress(publicKey, {
                                limit: 1,
                            });

                            for (const signatureInfo of transactionSignatures) {
                                // console.log(`Transaction Signature: ${signatureInfo.signature}`);

                                // Fetch the transaction details using the signature
                                const transactionDetails = await connection.getTransaction(signatureInfo.signature, {
                                    maxSupportedTransactionVersion: 0,
                                });

                                const onchainTxnAmount = await getTransactionAmount(signatureInfo.signature);
                                const isOnchainTxnAmountGreaterThanSpecifiedAmount = onchainTxnAmount >= amount;

                                if (transactionDetails && isOnchainTxnAmountGreaterThanSpecifiedAmount) {
                                    await SendmailTrackedAddress(signatureInfo.signature, key, userId);
                                    // console.log("Transaction details:", transactionDetails);
                                }
                            }
                        });
                    } catch (error) {
                        console.error("Error in processing transaction:", error);
                    } finally {
                        processingOnAccountChange = false; // Reset flag after processing
                        console.log("Resetting processing flag");
                    }
                }
            });
        } catch (error) {
            console.error(`Error tracking address ${key}:`, error);
        }
    });

    console.log('Listening for changes...');
}

export default trackAddress;
