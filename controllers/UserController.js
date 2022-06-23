const { User,CoinPrice,Wallet,UserFollow} = require('../models')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');
const { Op } = require("sequelize");
const EmailController = require("./EmailController");


class UserController {

    //user controller
    static async login(req, res, next) {
        try {
            console.log(req.body)
            const { email, password } = req.body;
            if (!email || !password) {
                throw { statusCode: 400 }
            }
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { email:email },
                        { username: email }
                      ]
                    
                },
            });

            if (!user) {
                throw { statusCode: 401, name: "INVALID_USERNAME" };
            }
            //console.log("Password is " + bcrypt.hashPass(password))
            console.log("Password is " + user.password);
            const same = bcrypt.comparePass(password, user.password);

            if (!same) {
                throw { statusCode: 401 };
            }

            const payload = { id: user.id, role: user.role };

            const token = jwt.payloadToToken(payload);

            res.status(200).json({
                access_token: token,
                email: user.email,
                role: user.role
            });
        } catch (error) {
            next(error);
        }
    }
    
    static async registerCustomer(req, res, next) {

        try {
            console.log(req.body);
            let { username, email, password, nickname,dateOfBirth } = req.body;
            if (!email || !password) {
                throw { statusCode: 400 }
            }
            if (password.length < 4) {
                throw { name: "INVALID_PASSWORD" }
            }
            password = bcrypt.hashPass(password);
            const user = await User.create({
                username,
                email,
                password,
                nickname,
                dateOfBirth,
                role: "customer",
            });
            res.status(201).json({
                message: email + " as customer registered"
            });
            const wallet = await Wallet.create({
                UserId: user.id,
                active: true,
                coin: 0
            })
        } catch (error) {
            console.log(error);
            next(error);
        }

    }

    static async register(req, res, next) {

        try {
            console.log(req.body);
            let { username, email, password, nickname,dateOfBirth } = req.body;
            if (!email || !password) {
                throw { statusCode: 400 }
            }
            if (password.length < 4) {
                throw { name: "INVALID_PASSWORD" }
            }
            password = bcrypt.hashPass(password);
            const user = await User.create({
                username,
                email,
                password,
                dateOfBirth,
                nickname,
                role: "admin",
            });
            res.status(201).json({
                message: email + " as admin registered"
            });
            const wallet = await Wallet.create({
                UserId: user.id,
                active: true,
                coin: 0
            })
        } catch (error) {
            console.log(error);
            next(error);
        }

    }

    static async loginGoogle(req, res, next) {
        try {
            console.log("GOOGLE LOGIN");
            console.log(req.body);
            let { token } = req.body
            console.log(token)
            if (!token) {
                throw { statusCode: 400 }
            }
            let client = new OAuth2Client(process.env.authClient);

            let ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.authClient,
            });
            let payload = ticket.getPayload()
            console.log(payload);

            let [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    password: Math.random().toString(20).substring(1, 6),
                    role: "customer"
                }
            })
            
            user = await user.update({role:"customer"});
            req.target={email : user.email};
            
            payload = { id: user.id, email: user.email, role: user.role };

            token = jwt.payloadToToken(payload);
            const wallet = await Wallet.findOne({
                where:{
                    UserId: user.id
                }
                
            })
            if(!wallet){
                const walletCreate = await Wallet.create({
                    UserId: user.id,
                    active: true,
                    coin: 0
                })
            }

            res.status(200).json({
                access_token: token,
                email: user.email,
                role: user.role
            });
            EmailController.sendMail(req,res);
            console.log(user.email, "<--- this is user")

        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async addCoinPrices(req, res, next) {

        try {
            console.log(req.body);
            let { ammount, price } = req.body;
            if (!ammount || !price) {
                throw { statusCode: 400 }
            }
            const coinprice = await CoinPrice.create({
                coinAmmount:ammount,
                price
            });
            res.status(201).json({
                message: "Price added"
            });
        } catch (error) {
            console.log(error);
            next(error);
        }

    }

    static async getCoin(req, res, next) {

        try {
            const price = await CoinPrice.findAll();
            res.status(200).json(price);
        } catch (error) {
            console.log(error);
            next(error);
        }

    }

    static async buyCoin(req, res, next) {

        try {
            let {id}=req.params
            const price = await CoinPrice.findByPk(id);
            let wallet = await Wallet.findOne({where:{UserId:req.user.id}});
            if(wallet && price){
                    wallet.coin= wallet.coin+price.coinAmmount;
                    wallet = await wallet.save();
                    res.status(200).json({message:"Coin has been added"})
            }
            // res.status(200).json(price);
        } catch (error) {
            console.log(error);
            next(error);
        }

    }

    static async giftCoin(req, res, next) {

        try {
            let {id}=req.params
            let {total}=req.body
            let wallet = await Wallet.findOne({where:{UserId:req.user.id}});
            let walletTarget = await Wallet.findOne({where:{UserId:id}});
            if(wallet&&walletTarget){
                if(wallet.coin>=total){
                    wallet.coin= wallet.coin-total;
                    walletTarget.coin= walletTarget.coin+total;
                    wallet = await wallet.save();
                    walletTarget= await walletTarget.save();
                    res.status(200).json({message:"Coin has been gifted"})
                }
            }
            // res.status(200).json(price);
        } catch (error) {
            console.log(error);
            next(error);
        }

    }

    static async getFollowing(req, res, next) {

        try {
            let id = req.user.id
            const following = await UserFollow.findAll({where:{UserId:id}});
            res.status(200).json(following);
        } catch (error) {
            console.log(error);
            next(error);
        }

    }

    static async follow(req, res, next) {

        try {
            let UserId = req.user.id
            let targetId= req.params.id
            const target = await User.findByPk(targetId);
            if(target){
                const following = await UserFollow.findOrCreate({where:{UserId:id,FollowerId:target.id}});    
                res.status(200).json({message:"User followed"});
            }
            
        } catch (error) {
            console.log(error);
            next(error);
        }

    }

    static async deleteFollow(req, res, next) {

        try {
            let UserId = req.user.id
            let targetId= req.params.id
            const target = await User.findByPk(targetId);
            if(target){
                const following = await UserFollow.findOne({where:{UserId:id,FollowerId:target.id}});
                if(following){
                    following.destroy();
                    res.status(200).json({message:"User unfollowed"});
                }else{
                    res.status(400).json({message:"User never followed"});
                }    
                
            }
            
        } catch (error) {
            console.log(error);
            next(error);
        }

    }
    
}

module.exports = UserController;