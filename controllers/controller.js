const {db} = require("../config/firebaseconfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class Controller {
    static async register(req, res) {
        try {
            let {name, password, status, email, imgProfile} = req.body;

            password = bcrypt.hashSync(password, 8)

            let data = {
                name, password, status, email, imgProfile
            }

            await db.collection("Users").add(data);
            res.status(201).json({
                message: "User has been created"
            });
        } catch (error) {
            console.log(error);
            const code = 500;
            const message = "ISE";

            res.status(code).json({
                message
            })
        }
    }

    static async login(req, res) {
        try {
            let {email, password} = req.body
        } catch (error) {
            
        }
    }
}

module.exports = Controller;