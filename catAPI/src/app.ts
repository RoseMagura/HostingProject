import * as express from 'express';
import * as cors from 'cors';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { query, setUp } from './initDB';
import * as swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';


dotenv.config();
const app: express.Application = express();
app.use(cors());

const swaggerFile = (process.cwd()+"/src/swagger.json");
const swaggerData = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response): void => {  
    res.send(JSON.stringify('Send a request to the backend'));
});

app.get('/all', async(req: Request, res: Response): Promise<void> => {
    const all = await query('SELECT * FROM IMAGES;');
    res.send(all.rows);
});

app.get('/id/:id', async(req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const image = await query(`SELECT * FROM IMAGES WHERE id=${id}`);
    res.send(image.rows);
});

app.listen(port, (): void => {
    setUp().catch(err => console.error(err));   
    console.log(`App listening at http://localhost:${port}`);
});
