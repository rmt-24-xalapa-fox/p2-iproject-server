const axios = require('axios')

const midtransClient = require('midtrans-client');
require('dotenv').config()
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
class apiRajaOngkir {

    static async getTokenmid(req, res, next) {
        try {
            //bayaran dari body di grossamount
            const { totalPrice } = req.body
            console.log(totalPrice);
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.Server_Key,
                clientKey: process.env.Client_Key
            });
            let codeUniq = Math.random().toString(36).substring(1, 7)
            let parameter = {
                "transaction_details": {
                    "order_id": codeUniq,
                    "gross_amount": totalPrice
                },
                "credit_card": {
                    "secure": true
                },
            };
            const transactionToken = await snap.createTransaction(parameter) //get token
            // console.log('transactionToken:', transactionToken.token);
            res.status(200).json({
                token: transactionToken.token
            })
        }
        catch (err) {
            next(err)
        }
    }

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
            const { idCity } = req.params
            // console.log(idCity);
            const getPrice = await axios.post(`https://api.rajaongkir.com/starter/cost`, {
                origin: '501',
                destination: idCity,
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