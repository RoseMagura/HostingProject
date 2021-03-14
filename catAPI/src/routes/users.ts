import * as express from 'express';
import { Request, Response } from 'express';
import { User } from '../initDB';
import { passportSetup } from '../auth/index';
import { authOptions } from './images';

passportSetup();

const router = express.Router();

router.get(
    '/all',
    async (req: Request, res: Response): Promise<void> => {
        try {
            const all = await User.findAll();
            res.send(all);
        } catch (error: unknown) {
            console.error(error);
            res.send(JSON.stringify(error));
        }
    }
);

router.get(
    '/id/:id',
    async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;
            const user = await User.findByPk(id);
            res.send(user);
        } catch (error: unknown) {
            console.error(error);
            res.send(JSON.stringify(error));
        }
    }
);

router.post(
    '/',
    async (req: any, res: Response): Promise<void> => {
        const { username, password, firstName, lastName } = req.body;
        try {
            const hashedPassword = password; // TODO: encrypt
            const postResult = await User.create({
                username,
                hashedPassword,
                firstName,
                lastName,
                admin: false, // admin will be false for this unauthorized route
            });
            res.send(
                JSON.stringify(
                    `Created user with id ${postResult.get('id')} successfully`
                )
            );
        } catch (error: unknown) {
            console.error(error);
            res.send(JSON.stringify(error));
        }
    }
);

// TODO: Create Admin (authorized) post route

router.delete(
    '/id/:id',
    authOptions,
    async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id;

        try {
            const user = await User.findByPk(id);
            // admin users can delete any users, but regular users
            // can only delete their own users
            if (req.user?.admin || user?.get('userId') === req.user?.id) {
                await User.destroy({
                    where: {
                        id,
                    },
                });
                res.send(JSON.stringify(`Deleted user successfully`));
            } else {
                res.send(
                    JSON.stringify(
                        "Can't delete: You can only delete other users if you are an admin."
                    )
                );
            }
        } catch (error: unknown) {
            console.log(error);
            res.send(JSON.stringify(error));
        }
    }
);

// Put Request (change username, password, etc.)
router.put(
    '/id/:id',
    authOptions,
    async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id;
        // Note that the request body should contain all four
        const { username, password, firstName, lastName } = req.body;
        try {
            const user = await User.findByPk(id);
            // admin users can edit any users, but regular users
            // can only edit their own data
            if (req.user?.admin || user?.get('userId') === req.user?.id) {
                await User.update(
                    {
                        username,
                        password,
                        firstName,
                        lastName,
                    },
                    { where: { id } }
                );
                res.send(JSON.stringify('Edited user successfully'));
            } else {
                res.send(
                    JSON.stringify(
                        "Can't edit: You can only edit other users if you are an admin."
                    )
                );
            }
        } catch (error: unknown) {
            console.error(error);
            res.send(JSON.stringify(error));
        }
    }
);

// TODO: Put request (authorized) to set as admin or remove admin privileges

export default router;
