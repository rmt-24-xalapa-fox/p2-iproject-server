const { Rentalan } = require('../models/index')

class PlayerController {
    static async readRentalan(req, res, next) {
        try {
            const rentalan = await Rentalan.findAll()
            res.status(200).json({
                rentalan
            })
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = PlayerController