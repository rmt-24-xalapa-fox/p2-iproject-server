const { User } = require("../models");
const { verifyTokenData } = require("../helpers/index");

const authentication = async (req, res, next) => {
    try {
        const { access_token: token } = req.headers;
        let payload = verifyTokenData(token);

        const user = await User.findByPk(payload.id);
        if (!user) {
            throw {
                code: 401,
                name: "Invalid_token",
                message: "Invalid token",
            };
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

module.exports = authentication;