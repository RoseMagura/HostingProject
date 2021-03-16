import * as express from 'express';
import { Request, Response } from 'express';
import { User } from '../initDB';
import { passportSetup } from '../auth/index';
import { authOptions } from './images';
import * as bcrypt from 'bcrypt';

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
            const hashedPassword = await bcrypt.hash(password, 10);
            const postResult = await User.create({
                username,
                password: hashedPassword,
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

// Create Admin (authorized) post route
router.post('/admin', authOptions, async (req: Request, res: Response): Promise<void> => {
    const { username, password, firstName, lastName } = req.body;
    try {
        if (req.user?.admin) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const dbResult = await User.create({
                username,
                password: hashedPassword,
                firstName,
                lastName,
                admin: true, 
            });
            res.send(JSON.stringify(`Created admin with id ${dbResult.get('id')} successfully`));
        } else {
            res.send(JSON.stringify('Can only create admin if you are an admin'))
        }
    } catch (error: unknown) {
        console.error(error);
        res.send(JSON.stringify(error));
    }
});

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

// Put request (authorized) to set as admin or remove admin privileges
router.put('/admin/id/:id', authOptions, async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const status = req.query.status;
    console.log('STATUS', status);
    try {
        if (req.user?.admin) {
            await User.update({
                admin: status
            }, { where: { id }});
            res.send(JSON.stringify('User admin status changed'));
        } else {
            res.send(JSON.stringify('Can only change admin status if you are an admin'))
        }
    } catch (error: unknown) {
        console.error(error);
        res.send(JSON.stringify(error));
    }
});

// Put Request (change username, password, etc.)
router.put(
    '/id/:id',
    authOptions,
    async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id;
        try {
            // admin users can edit any users, but regular users
            // can only edit their own data
            if (req.user?.admin || id === String(req.user?.id)) {
                const { username, password, firstName, lastName } = req.body;
                const hashedPassword = await bcrypt.hash(password, 10);
                await User.update(
                    {
                        username,
                        password: hashedPassword,
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

export default router;
