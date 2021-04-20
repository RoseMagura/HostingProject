import { User } from "../initDB";
import * as bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

export const authOptions = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (error: unknown) {
    console.error(error);
    res.status(401).send(JSON.stringify(`${error}`));
  }
};

export const issueToken = async (
  username: string,
  password: string,
  res: Response
): Promise<void> => {
  const user = await User.findOne({
    where: { username },
  }).catch((error: unknown) => console.error(error));
  if (!user) {
    console.error("User does not exist");
    res.status(401).send(JSON.stringify("Could not login: invalid username"));
  }
  // Check if user is null or undefined
  if (user == null) {
    console.error("User is null or undefined");
    res.send(JSON.stringify("Failed to login: User is null"));
  } else {
    await bcrypt.compare(
      password,
      String(user?.get("password")),
      (err, match) => {
        if (err) {
          console.error(err);
          res.send(JSON.stringify(`Error: ${err}`));
        }
        if (match) {
          console.log("Passwords match");
          const userId = user?.get("id");
          const admin = user?.get("admin");
          // Create JSON Web Token with defaults
          const token = jwt.sign(
            { userId, username, admin },
            String(process.env.PRIVATE_KEY).replace(/\\n/gm, "\n")
          );

          res.json({ token, userId, admin });
        } else {
          console.log("Password doesn't match");
          res
            .status(401)
            .send(
              JSON.stringify(
                "Failed to authorize: Password doesn't match username"
              )
            );
        }
      }
    );
  }
};
