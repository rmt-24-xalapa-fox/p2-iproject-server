const { comparePass } = require("../helper/bcrypt");
const { createToken } = require("../helper/jwt");
const { Customer, Genre, Novel, Favorite } = require("../models/index");


class CustomerController{
    static async homeCust(req, res, next){
        try{
            let { page = 1, genre, title } = req.query
            let pageLimit = 6
            let offset = (page - 1) * pageLimit
            let option = {
                include: {
                    model: Genre,
                    attributes: ["name"]
                },
                pageLimit, 
                offset,
                order: [["id", "ASC"]]
            }
            if(genre){
                option.where = {
                    ...option.where,
                    genreId: {
                        [Op.eq]: Number(genre)
                    }
                }
            }
            if(title){
                option.where = {
                    ...option.where,
                    genreId: {
                        [Op.iLike]: `%${title}%`
                    }
                }
            }
            const getAllNovel = await Novel.findAndCountAll(option)
            res.status(200).json({
                statusCode: 200,
                data: getAllNovel
            })
        }catch(err){
            console.log(err);
            next(err)
        }
    }

    static async registerCust(req, res, next){
        try{
            const { username, email, password, address, phoneNumber, role } = req.body
            const createCust = await Customer.create({
                username,
                email,
                password,
                address,
                phoneNumber,
                role: "customer"
            })

            res.status(201).json({
                statusCode: 201,
                msg: "Account has been created",
                data: {
                    id: createCust.id,
                    email: createCust.email
                }
            })
        }catch(err){
            console.log(err);
            next(err)
        }
    }

    static async loginCust(req, res, next){
        try{
            const { email, password } = req.body
            const customer = await Customer.findOne({
                where: {
                    email
                }
            })

            if(!customer){
                throw {
                    name: "Invalid email or password"
                }
            }

            const validasiCust = comparePass(password, customer.password)
            if(!validasiCust){
                throw {
                    name: "Invalid email or password"
                }
            }

            const payload = {
                id: customer.id,
                email: customer.email
            }

            const token = createToken(payload)

            res.status(200).json({
                msg: "Login succes",
                data: {
                  token,
                }
            })
        }catch(err){
            console.log(err);
            next(err)
        }
    }

    static async novelById(req, res, next){
        try{
            const NovelId = +req.params.id
            const novelById = await Novel.findByPk(NovelId);

            if (novelById <= 0 || !novelById) {
              throw { name: "Data not found"}
            }
            res.status(200).json({
              statusCode: 200,
              data: novelById
            });
        }catch(err){
            console.log(err);
            next(err)
        }
    }

    static async getAllFavorite(req, res, next){
        try{
            const favoriteNovel = await Favorite.findAll({
                include: [{
                    model: Novel
                }, {
                    model: Genre
                }]
            })
            console.log(favoriteNovel);

            res.status(200).json({
                statusCode: 200,
                data: favoriteNovel
            })
        }catch(err){
            console.log(err);
            next(err)
        }
    }

    static async addFavorite(req, res, next){
        try{
            const NovelId = +req.params.id;
            const CustomerId = +req.params.id;
            
            const allNovel = await Novel.findOne({
                where: {
                    id: NovelId
                }
            })

            if(!allNovel){
                throw { name: "Data not found"}
            }

            const [ favoriteNovel, create ] = await Favorite.findOrCreate({
                where: {
                    NovelId,
                    CustomerId
                }
            })

            if(!create){
                throw {
                    name: "Novel alredy in list"
                }
            }

            res.status(201).json({
                statusCode: 201,
                msg: `Novel with id ${NovelId} succesfully added to Favorite`,
                data: favoriteNovel
            })
        }catch(err){
            console.log(err);
            next(err)
        }
    }
}

module.exports = CustomerController