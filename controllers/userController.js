const { User } = require("../models");
const { addToken, verifyPassword } = require("../helpers/index");


class userController {

    static async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const dataUser = { name, email, password };
            const user = await User.create(dataUser);

            res.status(200).json({ id: user.id, email: user.email });
        } catch (err) {
            next(err);
        }
    };

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email) {
                throw new Error("Email cannot be null");
            }
            if (!password) {
                throw new Error("Password cannot be null");
            }

            const user = await User.findOne({
                where: {
                    email,
                },
            });

            if (!user) {
                throw new Error("User not found");
            }

            let isValid = verifyPassword(password, user.password);
            if (!isValid) {
                throw new Error("User not found");
            }

            const payload = {
                id: user.id,
                email: user.email,
            };

            const token = addToken(payload);
            res.status(200).json({ access_token: token });
        } catch (err) {
            next(err);
        }
    };
}


module.exports = userController