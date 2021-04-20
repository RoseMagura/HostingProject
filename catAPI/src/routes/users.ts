import * as express from "express";
import { Request, Response } from "express";
import { User } from "../initDB";
import { issueToken } from "../auth/index";
import { authOptions } from "../auth/index";
import * as bcrypt from "bcrypt";

const router = express.Router();

router.get(
  "/all",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const all = await User.findAll();
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
      const user = await User.findByPk(id);
      if (user === null) {
        res.status(404).send(JSON.stringify("Could not find that user"));
      } else {
        res.json(user);
      }
    } catch (error: unknown) {
      console.error(error);
      res.send(JSON.stringify(error));
    }
  }
);

router.post(
  "/",
  async (req: Request, res: Response): Promise<void> => {
    const { username, password, firstName, lastName } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        username,
        password: hashedPassword,
        firstName,
        lastName,
        admin: false, // admin will be false for this unauthorized route
      });
      await issueToken(username, password, res);
    } catch (error: unknown) {
      console.error(error);
      res.send(JSON.stringify(error));
    }
  }
);

// Create Admin (authorized) post route
// Delete? Not being used by the frontend
router.post(
  "/admin",
  authOptions,
  async (req: Request, res: Response): Promise<void> => {
    const { username, password, firstName, lastName } = req.body;
    try {
      if (req.user?.admin) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
          username,
          password: hashedPassword,
          firstName,
          lastName,
          admin: true,
        });
        issueToken(username, password, res);
      } else {
        res.send(JSON.stringify("Can only create admin if you are an admin"));
      }
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
      const user = await User.findByPk(id);
      if (user === null) {
        res.status(404).send(JSON.stringify("Could not find that user"));
      } else {
        // admin users can delete any users, but regular users
        // can only delete their own users
        if (req.user?.admin || user?.get("userId") === req.user?.id) {
          await User.destroy({
            where: {
              id,
            },
          });
          res.send(JSON.stringify(`Deleted user successfully`));
        } else {
          res
            .status(403)
            .send(
              JSON.stringify(
                "Can't delete: You can only delete other users if you are an admin."
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

// Put request (authorized) to set as admin or remove admin privileges
router.put(
  "/admin/id/:id",
  authOptions,
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const status = req.query.status;
    try {
      const user = await User.findByPk(id);
      if (user === null) {
        res.status(404).send(JSON.stringify("Could not find that user"));
      } else {
        if (req.user?.admin) {
          await User.update(
            {
              admin: status,
            },
            { where: { id } }
          );
          res.send(JSON.stringify("User admin status changed"));
        } else {
          res.send(
            JSON.stringify("Can only change admin status if you are an admin")
          );
        }
      }
    } catch (error: unknown) {
      console.error(error);
      res.send(JSON.stringify(error));
    }
  }
);

// Put Request (change username, password, etc.)
router.put(
  "/id/:id",
  authOptions,
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    // console.log(id, req.user);
    try {
      const user = await User.findByPk(id);
      if (user === null) {
        res.status(404).send(JSON.stringify("Could not find that user"));
      } else {
        // admin users can edit any users, but regular users
        // can only edit their own data
        if (req.user?.admin || id === String(req.user?.userId)) {
          const { username, password, firstName, lastName, admin } = req.body;

          if (admin === true && !req.user?.admin) {
            res.status(403).send(JSON.stringify("Can't change admin status"));
            return;
          }

          if (password !== undefined) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.update(
              {
                username,
                password: hashedPassword,
                firstName,
                lastName,
                admin,
              },
              { where: { id } }
            );
          } else {
            await User.update(
              {
                username,
                firstName,
                lastName,
                admin,
              },
              { where: { id } }
            );
          }
          res.send(JSON.stringify("Edited user successfully"));
        } else {
          res
            .status(403)
            .send(
              JSON.stringify(
                "Can't edit: You can only edit other users if you are an admin."
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
