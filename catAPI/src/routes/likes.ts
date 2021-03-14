import * as express from 'express';
import { Request, Response } from 'express';
import { Like } from '../initDB';
import { passportSetup } from '../auth/index';
import { authOptions } from './images';

passportSetup();

const router = express.Router();

router.get(
    '/all',
    async (req: Request, res: Response): Promise<void> => {
        try {
            const all = await Like.findAll();
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
            const like = await Like.findByPk(id);
            res.send(like);
        } catch (error: unknown) {
            console.error(error);
            res.send(JSON.stringify(error));
        }
    }
);

router.post(
    '/',
    authOptions,
    async (req: any, res: Response): Promise<void> => {
        const { userId, imageId } = req.body;
        try {
            const postResult = await Like.create({
                userId,
                imageId
            });
            res.send(
                JSON.stringify(`Created like with id ${postResult.get('id')} successfully`)
            );
        } catch (error: unknown) {
            console.error(error);
            res.send(JSON.stringify(error));
        }
    }
);

router.delete(
    '/id/:id',
    authOptions,
    async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id;

        try {
            const like = await Like.findByPk(id);
            // admin users can delete any likes, but regular users
            // can only delete their own likes
            if (req.user?.admin || like?.get('userId') === req.user?.id) {
                await Like.destroy({
                    where: {
                        id,
                    },
                });
                res.send(JSON.stringify(`Deleted like successfully`));
            } else {
                res.send(
                    "Can't delete: You can only delete others' likes if you are an admin."
                );
            }
        } catch (error: unknown) {
            console.log(error);
            res.send(JSON.stringify(error));
        }
    }
);

export default router;