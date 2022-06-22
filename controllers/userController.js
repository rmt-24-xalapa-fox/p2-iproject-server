const { User } = require("../models");
const { addToken, verifyPassword } = require("../helpers/index");

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const dataUser = { name, email, password };
        const user = await User.create(dataUser);

        res.status(200).json({ id: user.id, email: user.email });
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            throw {
                code: 400,
                name: "Email_is_Required",
                message: "Email is required",
            };
        }
        if (!password) {
            throw {
                code: 400,
                name: "Password_is_Required",
                message: "Password is required",
            };
        }

        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            throw {
                code: 401,
                name: "User_Not_Found",
                message: "Invalid email/password",
            };
        }

        let isValid = verifyPassword(password, user.password);
        if (!isValid) {
            throw {
                code: 401,
                name: "User_Not_Found",
                message: "Invalid email/password",
            };
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

module.exports = {
    login,
    register,
};