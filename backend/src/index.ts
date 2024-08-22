import express, { json, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './routes/user.route'
import trackAccountRouter from './routes/trackAddress.route'

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',//(https://your-client-app.com)
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/accounts', trackAccountRouter )

app.listen(3001, () => console.log("server is listenin at port 3001"))