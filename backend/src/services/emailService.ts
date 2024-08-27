import nodemailer from 'nodemailer'
import getAllUserEmail, { getUserEmailWithUserId } from '../utils/getAllUser'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';



const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
        user: "priyanshu16181389@gmail.com",
        pass: process.env.NodemailerPass
    }
});


const Sendmail = async (amountInLamport:Number, signature: string) => {
  const Allmail = await getAllUserEmail();
    try {
      const info = await transporter.sendMail({
          from: '"whale Alert" <priyanshu16181389@gmail.com>',
          to: Allmail?.join(','),
          subject: "Whale Transaction Detected🚨",
          text:"jfdljfl",
          html: `<p>💡 We track the transaction around ${amountInLamport } SOL on Solana chain and you can also track on-chain (DEX) whale activity that gives you better understanding on what's going on in the market. This is the txn signature -> ${signature} </p>`
      })

      // console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Error sending email:", error);
      // res.status(500).send("Error sending email");
    }
}

export const SendmailTrackedAddress = async (txnSignature: string, address: string, userId: number) => {
  const mail = await getUserEmailWithUserId(userId);
  if(!mail){
    return;
  }
    try {
      const info = await transporter.sendMail({
          from: '"Transaction Alert" <priyanshu16181389@gmail.com>',
          to: mail,
          subject: `Transaction Detected🚨 on this ${address}`,
          text:"jfdljfl",
          html: `<p>💡 We detect some activity on this address ${address}, the recent transaction signature is this ${txnSignature} . For more details check on Solana Explorer. </p>`
      })

      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Error sending email:", error);
      // res.status(500).send("Error sending email");
    }
}



export default Sendmail;
