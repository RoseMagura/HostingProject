import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { Image } from '../initDB';
const jwt = require('jsonwebtoken');
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

export const authOptions = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch (error: unknown) {
        console.error(error);
        res.status(401).send(JSON.stringify(error));
    }
};

router.get(
    '/all',
    async (req: Request, res: Response): Promise<void> => {
        try {
            const all = await Image.findAll();
            res.json(all);
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
            const image = await Image.findByPk(id);
            if (image === null) {
                res.status(404).send(
                    JSON.stringify('Could not find that image')
                );
            } else {
                res.json(image);
            }
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
        const { title, url, userId } = req.body;
        try {
            const postResult = await Image.create({
                title,
                url,
                userId,
            });
            res.send(
                JSON.stringify(
                    `Created image with id ${postResult.get('id')} successfully`
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
            const image = await Image.findByPk(id);
            if (image === null) {
                res.status(404).send(
                    JSON.stringify('Could not find that image')
                );
            } else {
                const name = image !== null && image.get('title');
                // admin users can delete any images, but regular users
                // can only delete their own images
                if (req.user?.admin || image?.get('userId') === req.user?.id) {
                    await Image.destroy({
                        where: {
                            id,
                        },
                    });
                    res.send(`Deleted ${name} successfully`);
                } else {
                    res.send(
                        "Can't delete: You can only delete others' images if you are an admin."
                    );
                }
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
        const { title, url, userId } = req.body;
        try {
            const image = await Image.findByPk(id);
            if (image === null) {
                res.status(404).send(
                    JSON.stringify('Could not find that image')
                );
            } else {
                // admin users can edit any images, but regular users
                // can only edit their own images
                if (
                    req.user?.admin ||
                    image?.get('userId') === String(req.user?.id)
                ) {
                    await Image.update(
                        {
                            title,
                            url,
                            userId,
                        },
                        { where: { id } }
                    );
                    res.send('Edited image successfully');
                } else {
                    res.send(
                        "Can't edit: You can only edit others' images if you are an admin."
                    );
                }
            }
        } catch (error: unknown) {
            console.error(error);
            res.send(JSON.stringify(error));
        }
    }
);

export default router;
