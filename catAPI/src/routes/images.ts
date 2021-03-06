import * as express from 'express';
import { Request, Response } from 'express';
import { query } from '../initDB';

const router = express.Router();

// TODO: Add auth
router.get('/', (req: Request, res: Response): void => {  
    res.send(JSON.stringify('Send a request to the backend'));
});

router.get('/all', async(req: Request, res: Response): Promise<void> => {
    const all = await query('SELECT * FROM IMAGES;');
    res.send(all.rows);
});

router.get('/id/:id', async(req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const image = await query(`SELECT * FROM IMAGES WHERE id=${id}`);
    res.send(image.rows);
});

// post

// delete

// put (change title or url)

export default router;
