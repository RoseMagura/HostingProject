import * as express from "express";
import { Request, Response } from "express";
import { Comment, User } from "../initDB";
import { authOptions } from "../auth/index";

const router = express.Router();

router.get(
  "/all",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const all = await Comment.findAll();
      res.json(all);
    } catch (error: unknown) {
      console.error(error);
      res.send(JSON.stringify(error));
    }
  }
);

// Get by comment id
router.get(
  "/id/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const comment = await Comment.findByPk(id);
      if (comment === null) {
        res.status(404).send(JSON.stringify("Could not find that comment"));
      } else {
        res.json(comment);
      }
    } catch (error: unknown) {
      console.error(error);
      res.send(JSON.stringify(error));
    }
  }
);

// Get by image id
router.get(
  "/imageId/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const comments = await Comment.findAll({
        where: { imageId: id },
        include: [{ model: User, attributes: ["firstName", "lastName"] }],
      });
      if (comments === null) {
        res
          .status(404)
          .send(JSON.stringify("Could not find any comments for that image"));
      }
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error));
    }
  }
);

router.post(
  "/",
  authOptions,
  async (req: Request, res: Response): Promise<void> => {
    const { userId, imageId, text } = req.body;
    try {
      const postResult = await Comment.create({
        userId,
        imageId,
        text,
      });
      const fullComment = await Comment.findAll({
        where: { id: Number(postResult.get("id")) },
        include: [{ model: User, attributes: ["firstName", "lastName"] }],
      });
      res.json(fullComment);
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
      const comment = await Comment.findByPk(id);

      if (comment === null) {
        res.status(404).send(JSON.stringify("Could not find that comment"));
      } else {
        // admin users can delete any comments, but regular users
        // can only delete their own comments
        if (req.user?.admin || comment?.get("userId") === req.user?.userId) {
          await Comment.destroy({
            where: {
              id,
            },
          });
          res.send(JSON.stringify(`Deleted comment successfully`));
        } else {
          res
            .status(403)
            .send(
              JSON.stringify(
                "Can't delete: You can only delete others' comments if you are an admin."
              )
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
  "/id/:id",
  authOptions,
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    // Note that the request body should contain all three
    const { text, userId } = req.body;
    try {
      const comment = await Comment.findByPk(id);
      if (comment === null) {
        res.status(404).send(JSON.stringify("Could not find that comment"));
      } else {
        // admin users can edit any comments, but regular users
        // can only edit their own comments
        if (req.user?.admin || comment?.get("userId") === req.user?.userId) {
          await Comment.update(
            {
              text,
              userId,
            },
            { where: { id } }
          );
          res.send(JSON.stringify("Edited comment successfully"));
        } else {
          res
            .status(403)
            .send(
              JSON.stringify(
                "Can't edit: You can only edit others' comments if you are an admin."
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
