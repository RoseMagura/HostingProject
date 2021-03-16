import { BasicStrategy } from 'passport-http';
import { User } from '../initDB';
import * as passport from 'passport';
import * as bcrypt from 'bcrypt';

export const passportSetup = (): void => {
    passport.use(
        'basic',
        new BasicStrategy(async (username, password, cb) => {
            const user = await User.findOne({
                where: { username },
            }).catch((error) => cb(error));
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
