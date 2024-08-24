// import WebSocket from "ws";
// import getTransaction from "./solanaServices";
// const wsConnectionUrl = 'wss://api.mainnet-beta.solana.com'

// const wss = new WebSocket(wsConnectionUrl);

// wss.on('connection', (ws) => {
//     console.log("client connected");

//     ws.on('message', (message:any) => {
//         console.log(`Recieved message`, message)
//     })

//     ws.on('close', () => {
//         console.log('Client disconnected.');
//     });
// })

// getTransaction()


import * as web3 from '@solana/web3.js'

const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed')

const trackedAddress = "8d9CSQjVjyd4Tnm9XLU37kK6g8MDWCoUtH9JfD62KSnw";
const publicKey = new web3.PublicKey(trackedAddress);

async function trackAddress() {
  try {
    console.log(`Tracking transactions for address: ${trackedAddress}`);

    // Subscribe to account changes for the specified address
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
          console.log("Transaction details:", transactionDetails);
        }
      }
    });

    console.log('Listening for changes...');

  } catch (error) {
    console.error("Error tracking address:", error);
  }
}

// Start tracking the address
trackAddress();

