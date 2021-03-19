import * as express from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import imagesRouter from './routes/images';
import docsRouter from './routes/docs';
import likesRouter from './routes/likes';
import commentsRouter from './routes/comments';
import usersRouter from './routes/users';
import { createRelationships } from './initDB';
import * as passport from 'passport';
import { issueToken } from './auth/index';

dotenv.config();
const app: express.Application = express();
app.use(cors());
app.use(passport.initialize());
app.use(express.json());

// make certain fields accessible through the Express version of user
declare global {
    namespace Express {
        interface User {
            id: string;
            admin?: boolean;
        }
    }
}

const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req: Request, res: Response): void => {
    res.send(JSON.stringify('Send a request to the backend'));
});

app.post(
    '/login',
    async (req: Request, res: Response): Promise<void> => {
        const { username, password } = req.body;
        await issueToken(username, password, res);
    }
);

app.use('/images', imagesRouter);
app.use('/api-docs', docsRouter);
app.use('/likes', likesRouter);
app.use('/comments', commentsRouter);
app.use('/users', usersRouter);

// Handle 404 errors
app.use((req: Request, res: Response) => {
    res.status(404).send('Unable to find that page');
});

app.listen(port, (): void => {
    createRelationships();
    console.log(`App listening at http://localhost:${port}`);
});

export default app;