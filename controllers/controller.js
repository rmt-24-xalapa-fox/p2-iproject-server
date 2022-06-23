const {Customer, Barber, Transaction, Favorite} = require('../models')
const { bcryptCompareSync } = require('../helpers/bcrypt')
const { convertPayloadToToken } = require('../helpers/jwt')
const { Op } = require('sequelize')
const { OAuth2Client } = require('google-auth-library');
const { CLIENT_ID } = process.env

class Controller {
    static async registerationCustomer (req, res, next) {
        try {
            const { name, email, password, location } = req.body
            const createCustomer = await Customer.create({
                name, email, password, location
            })
            res.status(201).json({
                statusCode: 201,
                data: {
                    message: 'Customer has been created',
                    newUser: {
                        id: createCustomer.id,
                        email: createCustomer.email    
                    }
                }
            })
        } catch (err) {
            next(err)
        }
    }
    
    // static async googleLoginCustomer (req, res, next) {
    //     try {
    //         const client = new OAuth2Client(CLIENT_ID);
    //         const ticket = await client.verifyIdToken({
    //             idToken: req.headers.credential,
    //             audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    //             // Or, if multiple clients access the backend:
    //             //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    //         });
    //         const payload = ticket.getPayload();
    //         let token
    //         let email = payload.email
    //         let foundUser = await Customer.findOne({ where: { email } })
    //         if (foundUser) {
    //             token = convertPayloadToToken({
    //                 id: foundUser.id
    //             })
    //             res.status(200).json({
    //                 statusCode: 200,
    //                 data: {
    //                     id: foundUser.id,
    //                     name: foundUser.username,
    //                     accessToken: token,
    //                 }
    //             })    
    //         } else {
    //             foundUser = await Customer.create({
    //                 name: payload.name.split(" ").join("_"), email, password: "Google Sign In", location: "Unknown"
    //             }, { hooks : false })
    //             token = convertPayloadToToken({
    //                 id: foundUser.id
    //             })
    //             res.status(200).json({
    //                 statusCode: 200,
    //                 data: {
    //                     id: foundUser.id,
    //                     name: foundUser.username,
    //                     accessToken: token,
    //                 }
    //             })    

    //         }

    //     } catch (err) {
    //         next(err)
    //     }
    // }

    // static async registerationBarber (req, res, next) {
    //     try {
    //         const { email, password, name, price, location, profile_image } = req.body
    //         const createBarber = await Barber.create({
    //             email, password, name, price, location, profile_image, rating: 0, ratingCount: 0
    //         })
    //         res.status(201).json({
    //             statusCode: 201,
    //             data: {
    //                 message: 'Barber has been created',
    //                 newUser: {
    //                     id: createBarber.id,
    //                     email: createBarber.email    
    //                 }
    //             }
    //         })
    //     } catch (err) {
    //         console.log(err)
    //         next(err)
    //     }
    // }

    // static async loginBarber (req, res, next) {
    //     try {
    //         const { email, password } = req.body
    //         const foundUser = await Barber.findOne({
    //             where: {
    //                 email: email
    //             }
    //         })
    //         if (!foundUser) {
    //             throw { name: "User not found" }
    //         }
    //         const passwordChecking = bcryptCompareSync(password, foundUser.password)
    //         if (!passwordChecking) {
    //             throw { name: "User not found" }
    //         }
    //         const payloadSend = {
    //             id: foundUser.id
    //         }

    //         const token = convertPayloadToToken(payloadSend)

    //         res.status(200).json({
    //             statusCode: 200,
    //             data: {
    //                 id: foundUser.id,
    //                 name: foundUser.username,
    //                 role: foundUser.role,
    //                 accessToken: token,
    //             }
    //         })
    //     } catch (err) {
    //         next(err)
    //     }
    // }

    // static async loginCustomer (req, res, next) {
    //     try {
    //         const { email, password } = req.body
    //         const foundUser = await Customer.findOne({
    //             where: {
    //                 email: email
    //             }
    //         })
    //         if (!foundUser) {
    //             throw { name: "User not found" }
    //         }
    //         const passwordChecking = bcryptCompareSync(password, foundUser.password)
    //         if (!passwordChecking) {
    //             throw { name: "User not found" }
    //         }
    //         const payloadSend = {
    //             id: foundUser.id
    //         }

    //         const token = convertPayloadToToken(payloadSend)

    //         res.status(200).json({
    //             statusCode: 200,
    //             data: {
    //                 id: foundUser.id,
    //                 name: foundUser.username,
    //                 role: foundUser.role,
    //                 accessToken: token,
    //             }
    //         })
    //     } catch (err) {
    //         next(err)
    //     }    
    // }

    // static async barberTransactions (req, res, next) {
    //     try {
    //         const transactions = await Transaction.findAll({
    //             include: Customer,
    //             where: {
    //                 BarberId: req.user.id,
    //             }
    //         })
    //         res.status(200).json({
    //             transactions
    //         })
    //     } catch(err){

    //     }
    // }
    
    // static async barberUpdateStatus (req, res, next) {
    //     try {
    //         const {status} = req.body
    //         const {transId} = req.params
    //         const update = await Transaction.update({status}, {
    //             where: {
    //                 id: transId,
    //             }
    //         })
    //         if(!update) {
    //             throw{name:'Error not found'}
    //         }
    //         res.status(200).json({
    //             update
    //         })
    //     } catch(err) {

    //     }
    // }
    
    // static async updateBarberPrice (req, res, next) {
    //     try {
    //         const {price} = req.body
    //         const update = await Barber.update({price}, {
    //             where: {
    //                 id: req.user.id,
    //             }
    //         })
    //         res.status(200).json({
    //             update
    //         })
    //     } catch(err) {

    //     }
    // }

    // static async getTransactions (req, res, next) {
    //     try {
    //         const transactions = await Transaction.findAll({
    //             include: Barber,
    //             where: {
    //                 CustomerId: req.user.id
    //             }
    //         })
    //         res.status(200).json(transactions)
    //     } catch (err) {
    //         console.log(err)
    //         next(err)
    //     }
    // }

    // static async getBarbers (req, res, next) {
    //     try {
    //         let attributes
    //         const {search} = req.query
    //         console.log(search)
    //         if (search) {
    //             attributes = {
    //                 where: {
    //                     name: {
    //                         [Op.iLike]: `%${search}%`
    //                     }
    //                 }
    //             }
    //         }
    //         const barbers = await Barber.findAll(attributes)
    //         res.status(200).json(barbers)
    //     } catch (err) {
    //         console.log(err)
    //         next(err)
    //     }
    // }

    // static async getFavorites (req, res, next) {
    //     try {
    //         const favorites = await Favorite.findAll({
    //             include: Barber,
    //             where: {
    //                 CustomerId: req.user.id
    //             }
    //         })
    //         res.status(200).json(favorites)
    //     } catch (err) {
    //         next(err)
    //     }
    // }

    // static async addFavorites (req, res, next) {
    //     try {
    //         const {BarberId} = req.params
    //         const findBarber = await Favorite.findOne({
    //             where:{
    //                 BarberId,
    //                 CustomerId: req.user.id
    //             }
    //         })
    //         if (findBarber) {
    //             throw{name: 'Barber is already in favorites'}
    //         }
    //         const addFavorites = await Favorite.create({
    //             CustomerId: req.user.id,
    //             BarberId,
    //         })
    //         res.status(201).json(addFavorites)
    //     } catch (err) {
    //         next(err)
    //     }
    // }

    // static async addTransaction (req, res, next) {
    //     try {
    //         const { BarberId } = req.params
    //         const { day, note } = req.body
    //         const addTransaction = await Transaction.create({
    //             BarberId,
    //             CustomerId: req.user.id,
    //             status: 'Pending',
    //             day,
    //             note
    //         })
    //         res.status(201).json(addTransaction)
    //     } catch (err) {
    //         next(err)
    //     }
    // }

    // static async addRating (req, res, next) {
    //     try {
    //         const { BarberId } = req.params
    //         const barber = Barber.findByPk(BarberId)
    //     } catch (err) {
    //         next(err)
    //     }
    // }

}

module.exports = Controller