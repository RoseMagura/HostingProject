import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import imagesRouter from "./routes/images";
import docsRouter from "./routes/docs";
import likesRouter from "./routes/likes";
import commentsRouter from "./routes/comments";
import usersRouter from "./routes/users";
import { issueToken } from "./auth/index";
const path = require("path");

dotenv.config();
const app: express.Application = express();
app.use(cors());
app.use(express.json());

// make certain fields accessible through the Express version of user
declare global {
  namespace Express {
    interface User {
      id: string;
      admin?: boolean;
      userId?: number;
    }
  }
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/../src/build")));

}


app.get('/', (req: Request, res: Response): void => {
  res.sendFile('build/index.html');
});

app.post(
  "/login",
  async (req: Request, res: Response): Promise<void> => {
    console.log("req.body", req.body);
    const { username, password } = req.body;
    await issueToken(username, password, res);
  }
);

app.use("/images", imagesRouter);
app.use("/api-docs", docsRouter);
app.use("/likes", likesRouter);
app.use("/comments", commentsRouter);
app.use("/users", usersRouter);

// // Handle 404 errors
// app.use((req: Request, res: Response) => {
//     res.status(404).send('Unable to find that page');
// });

export default app;
