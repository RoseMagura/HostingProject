import * as express from 'express';
import { Request, Response } from 'express';
import { Comment } from '../initDB';
import { passportSetup } from '../auth/index';
import { authOptions } from './images';

passportSetup();

const router = express.Router();

router.get(
    '/all',
    async (req: Request, res: Response): Promise<void> => {
        try {
            const all = await Comment.findAll();
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
            const comment = await Comment.findByPk(id);
            res.send(comment);
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
        const { userId, imageId, text } = req.body;
        try {
            const postResult = await Comment.create({
                userId,
                imageId,
                text,
            });
            res.send(
                JSON.stringify(
                    `Created comment with id ${postResult.get(
                        'id'
                    )} successfully`
                )
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
            const comment = await Comment.findByPk(id);
            // admin users can delete any comments, but regular users
            // can only delete their own comments
            if (req.user?.admin || comment?.get('userId') === String(req.user?.id)) {
                await Comment.destroy({
                    where: {
                        id,
                    },
                });
                res.send(JSON.stringify(`Deleted comment successfully`));
            } else {
                res.send(
                    JSON.stringify(
                        "Can't delete: You can only delete others' comments if you are an admin."
                    )
                );
            }
        } catch (error: unknown) {
            console.log(error);
            res.send(JSON.stringify(error));
        }
    }
);

// Put Request (change title, url, or user id)
router.put(
    '/id/:id',
    authOptions,
    async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id;
        // Note that the request body should contain all three
        const { text, userId } = req.body;
        try {
            const comment = await Comment.findByPk(id);
            // admin users can edit any comments, but regular users
            // can only edit their own comments
            if (req.user?.admin || comment?.get('userId') === req.user?.id) {
                await Comment.update(
                    {
                        text,
                        userId,
                    },
                    { where: { id } }
                );
                res.send(JSON.stringify('Edited comment successfully'));
            } else {
                res.send(
                    JSON.stringify(
                        "Can't edit: You can only edit others' comments if you are an admin."
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
