import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './routes/user.route';
import trackAccountRouter from './routes/trackAddress.route';
import getTransaction from './services/solanaServices';
import trackAddress from './services/trackSpecificAddress';
import prisma from './db';

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err && err.type === 'entity.parse.failed') {
        console.error('Failed to parse JSON:', err);
        return res.status(400).json({ error: 'Invalid JSON input' });
    }
    next(err);
});

const pollInterval = 10000; // Poll every 10 seconds

async function updateTrackedAddresses() {
    try {
        const datas = await prisma.trackAccounts.findMany();
        const arrUserId = datas.map((data) => data.userId);
        const uniqueArr = [...new Set(arrUserId)];
        // console.log("Updated unique user IDs:", uniqueArr);

        uniqueArr.forEach(async (userId) => {
            await trackAddress(userId);
        });
    } catch (error) {
        console.error("Error updating tracked addresses:", error);
    }
}

// Polling the database at regular intervals
setInterval(updateTrackedAddresses, pollInterval);

(async() => {
    await getTransaction()
})();



//  routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/accounts', trackAccountRouter);



app.listen(3001, () => console.log("Server is listening at port 3001"));
