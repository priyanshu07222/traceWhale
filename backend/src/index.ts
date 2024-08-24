import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './routes/user.route';
import trackAccountRouter from './routes/trackAddress.route';
import getTransaction from './services/solanaServices';

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

// CORS middleware
app.use(cors(corsOptions));

// JSON parser middleware
app.use(express.json());

// Middleware to handle cases where JSON body is expected but not provided
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err && err.type === 'entity.parse.failed') {
        console.error('Failed to parse JSON:', err);
        return res.status(400).json({ error: 'Invalid JSON input' });
    }
    next(err);
});

// (async() => {
//     await getTransaction()
// })();

// Your routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/accounts', trackAccountRouter);

app.listen(3001, () => console.log("Server is listening at port 3001"));
