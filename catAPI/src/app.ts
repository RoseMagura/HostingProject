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

import { User } from './initDB';
import * as bcrypt from 'bcrypt';

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
        console.log(req.body);
        const { username, password } = req.body;
        const user = await User.findOne({
            where: { username },
        }).catch((error: unknown) => console.error(error));
        console.log(user);
        // bcrypt.compare(
        //     password,
        //     String(user.get('password')));
        // const match = await bcrypt.compare(password, String(user.get('password')));
        res.send('OK');
    }
);

app.use('/images', imagesRouter);
app.use('/api-docs', docsRouter);
app.use('/likes', likesRouter);
app.use('/comments', commentsRouter);
app.use('/users', usersRouter);

app.listen(port, (): void => {
    createRelationships();
    console.log(`App listening at http://localhost:${port}`);
});
