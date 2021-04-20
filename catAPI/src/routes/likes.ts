import * as express from "express";
import { Request, Response } from "express";
import { Like, User } from "../initDB";
import { authOptions } from "../auth/index";

const router = express.Router();

router.get(
  "/all",
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

// Get by like id
router.get(
  "/id/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const like = await Like.findByPk(id);
      if (like === null) {
        res.status(404).send(JSON.stringify("Could not find that like"));
      } else {
        res.json(like);
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
      const likes = await Like.findAll({
        where: { imageId: id },
        include: [{ model: User, attributes: ["firstName", "lastName"] }],
      });
      if (likes === null) {
        res
          .status(404)
          .send(JSON.stringify("Could not find likes for that image"));
      } else {
        res.json(likes);
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
    const { userId, imageId } = req.body;
    console.log(userId, imageId);
    try {
      const postResult = await Like.create({
        userId,
        imageId,
      });
      res.send(
        JSON.stringify(
          `Created like with id ${postResult.get("id")} successfully`
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
      const like = await Like.findByPk(id);
      if (like === null) {
        res.status(404).send(JSON.stringify("Could not find that like"));
      } else {
        // admin users can delete any likes, but regular users
        // can only delete their own likes
        if (req.user?.admin || like?.get("userId") === String(req.user?.id)) {
          await Like.destroy({
            where: {
              id,
            },
          });
          res.send(JSON.stringify(`Deleted like successfully`));
        } else {
          res
            .status(403)
            .send(
              "Can't delete: You can only delete others' likes if you are an admin."
            );
        }
      }
    } catch (error: unknown) {
      console.log(error);
      res.send(JSON.stringify(error));
    }
  }
);

export default router;
