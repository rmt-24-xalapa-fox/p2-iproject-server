const { User } = require("../models");
const { verifyTokenData } = require("../helpers/index");

class authentication {

    static async authentication(req, res, next) {
        try {
            const access_token = req.headers.access_token;

            if (!access_token) {
                throw { name: "Invalid User Token" }
            }
            let payload = verifyTokenData(token);
            const user = await User.findByPk(payload.id);

            if (!user) {
                throw { name: "Invalid User Token" }
            }

            req.userOnLogin = {
                id: user.id,
                email: user.email,
            };

            next();
        } catch (err) {
            next(err);
        }
    };
}

module.exports = authentication;