const axios = require('axios')
require('dotenv').config()
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
class apiRajaOngkir {
    static async getAPIprov(req, res, next) {
        try {
            const getProvince = await axios.get(`https://api.rajaongkir.com/starter/province`, {
                headers: {
                    key: process.env.raja_key
                }
            })
            // console.log(getProvince.data.rajaongkir);
            res.status(200).json(getProvince.data.rajaongkir.results)
        }
        catch (err) {
            next(err);
        }

    }

    static async getAPIcity(req, res, next) {
        try {
            const { id } = req.params
            const getProvince = await axios.get(`https://api.rajaongkir.com/starter/city?province=${id}`,
                {
                    headers: {
                        key: process.env.raja_key
                    }
                }
            )
            // console.log(getProvince.data.rajaongkir);
            res.status(200).json(getProvince.data.rajaongkir.results)
        }
        catch (err) {
            console.log(err);
        }
    }

    static async getPrice(req, res, next) {
        try {
            const { city } = req.body
            const getPrice = await axios.post(`https://api.rajaongkir.com/starter/cost`, {
                origin: '501',
                destination: city,
                weight: 1000,
                courier: 'jne',
            }, {
                headers: {
                    key: process.env.raja_key,
                },


            })
            // console.log(getPrice.data.rajaongkir.results[0].costs[1].cost[0]);
            res.status(200).json(getPrice.data.rajaongkir.results[0].costs[1].cost[0])
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = apiRajaOngkir