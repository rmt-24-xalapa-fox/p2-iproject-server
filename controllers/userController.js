const { User } = require("../models");
const { addToken, verifyPassword } = require("../helpers/index");
const { initializeApp } = require("firebase/app")
const { getAuth } = require("firebase/auth")
const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "PROJECT_ID.firebaseapp.com",
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://DATABASE_NAME.firebaseio.com",
    projectId: "PROJECT_ID",
    storageBucket: "PROJECT_ID.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID",
}

class userController {
    static async firebaseAuth(req, res, next) {
        try {
            const app = initializeApp(firebaseConfig);

        } catch (err) {

        }
    }


    static async register(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body;
            const dataUser = { username, email, password, role: "customer", phoneNumber, address };
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
            res.status(200).json({
                access_token: token,
                id: user.id,
                email: user.email,
                username: user.username
            });
        } catch (err) {
            next(err);
        }
    };
}


module.exports = userController