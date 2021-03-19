<<<<<<< HEAD
import { BasicStrategy } from 'passport-http';
import { User } from '../initDB';
import * as passport from 'passport';
=======
import { User } from '../initDB';
>>>>>>> master
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
const jwt = require('jsonwebtoken');

<<<<<<< HEAD
export const passportSetup = (): void => {
    passport.use(
        'basic',
        new BasicStrategy(async (username, password, cb) => {
            const user = await User.findOne({
                where: { username },
            }).catch((error: unknown) => cb(error));
            if (!user) {
                return cb(null, false);
            }
            bcrypt.compare(
                password,
                String(user.get('password')),
                (err, res) => {
                    if (err) {
                        console.error(err);
                    }
                    if (res) {
                        console.log('Passwords match');
                        return cb(null, user);
                    } else {
                        console.log('Password doesn\'t match');
                        return cb(null, false);
                    }
                }
            );
        })
    );
};

=======
>>>>>>> master
export const issueToken = async (username: string, password: string, res: Response): Promise<void> => {
    const user = await User.findOne({
        where: { username },
    }).catch((error: unknown) => console.error(error));
    if (!user) {
        console.error('User does not exist');
        res.send(JSON.stringify('Could not login: invalid username'));
    }
    // Check if user is null or undefined
    if (user == null) {
        console.error('User is null or undefined');
        res.send(JSON.stringify('Error with username'));
    } else {
        await bcrypt.compare(
            password,
            String(user?.get('password')),
            (err, match) => {
                if (err) {
                    console.error(err);
                    res.send(JSON.stringify(`Error: ${err}`));
                }
                if (match) {
                    console.log('Passwords match');
                    const userId = user?.get('id');
                    const admin = user?.get('admin');
                    // Create JSON Web Token with defaults
                    const token = jwt.sign(
                        { userId, username, admin },
                        String(process.env.PRIVATE_KEY).replace(
                            /\\n/gm,
                            '\n'
                        )
                    );

                    res.json(token);
                } else {
                    console.log("Password doesn't match");
                    res.send(JSON.stringify('Failed to log in'));
                }
            }
        );
    }
}

