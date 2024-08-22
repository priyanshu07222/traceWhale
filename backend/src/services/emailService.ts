import nodemailer from 'nodemailer'


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


const Sendmail = async (to:string, amountInUSD:Number) => {
    try {
      const info = await transporter.sendMail({
          from: '"whale Alert" <priyanshu16181389@gmail.com>',
          to,
          subject: "Whale Transaction Detected🚨",
          text:"jfdljfl",
          html: `<p>💡 We track the transaction around ${amountInUSD} on Solana chain and you can also track on-chain (DEX) whale activity that gives you better understanding on what's going on in the market. </p>`
      })

      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Error sending email:", error);
      // res.status(500).send("Error sending email");
    }
}

export default Sendmail;
