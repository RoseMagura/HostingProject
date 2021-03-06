import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';

const router = express.Router();

const swaggerFile = (process.cwd()+"/src/swagger.json");
const swaggerData = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);  
router.use('', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;