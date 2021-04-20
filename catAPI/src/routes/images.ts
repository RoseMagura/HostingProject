import * as express from "express";
import { Request, Response } from "express";
import { Image } from "../initDB";
import * as dotenv from "dotenv";
import { authOptions } from "../auth";
const jwt = require("jsonwebtoken");

dotenv.config();

const router = express.Router();

router.get(
  "/all",
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
  "/id/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const image = await Image.findByPk(id);
      if (image === null) {
        res.status(404).send(JSON.stringify("Could not find that image"));
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
  "/",
  authOptions,
  async (req: Request, res: Response): Promise<void> => {
    const { title, url, userId } = req.body;
    try {
      const postResult = await Image.create({
        title,
        url,
        userId,
      });
      res.send(
        JSON.stringify(
          `Created image with id ${postResult.get("id")} successfully`
        )
      );
    } catch (error: unknown) {
      console.error(error);
      res.send(JSON.stringify(error));
    }
  }
);

router.delete(
  "/id/:id",
  authOptions,
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
      const decoded = jwt.verify(
        req.headers.authorization?.split(" ")[1],
        process.env.PRIVATE_KEY
      );
      const userId = decoded["userId"];
      const image = await Image.findByPk(id);
      if (image === null) {
        res.status(404).send(JSON.stringify("Could not find that image"));
      } else {
        const name = image !== null && image.get("title");
        console.log(image?.get("userId") == userId);
        // admin users can delete any images, but regular users
        // can only delete their own images
        if (req.user?.admin || image?.get("userId") === userId) {
          await Image.destroy({
            where: {
              id,
            },
          });
          res.send(JSON.stringify(`Deleted ${name} successfully`));
        } else {
          res
            .status(403)
            .send(
              JSON.stringify(
                "Can't delete: You can only delete others' images if you are an admin."
              )
            );
        }
      }
    } catch (error: any) {
      console.log(error);
      res.send(JSON.stringify(`${error.name} ${error.message}`));
    }
  }
);

// Put Request (change title, url, or user id)
router.put(
  "/id/:id",
  authOptions,
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    // Note that the request body should contain all three
    console.log(req.body);
    const { title, url, userId } = req.body;
    try {
      const image = await Image.findByPk(id);
      if (image === null) {
        res.status(404).send(JSON.stringify("Could not find that image"));
      } else {
        // admin users can edit any images, but regular users
        // can only edit their own images
        if (req.user?.admin || image?.get("userId") === req.user?.userId) {
          await Image.update(
            {
              title,
              url,
              userId,
            },
            { where: { id } }
          );
          res.send(JSON.stringify("Edited image successfully"));
        } else {
          res
            .status(403)
            .send(
              JSON.stringify(
                "Can't edit: You can only edit others' images if you are an admin."
              )
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
