const bcrypt = require("bcryptjs/dist/bcrypt");
const comparePw = require("../helpers/compare-pw");
const { convertPayloadToToken } = require("../helpers/jwt");
const { User, Report } = require("../models");
// const { OAuth2Client } = require("google-auth-library");
// const  CLIENT_ID  = process.env.CLIENT_ID;
// const  QR_API  = process.env.QR_API;
const { Op } = require("sequelize");
const axios = require(`axios`)
const BASE_URL = `http://localhost:8080/`


class publicController {
    static async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const newUser = await User.create({ email, password, role: `normalUser` });
            res.status(200).json({
                statusCode: 200,
                message: newUser,
            });
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const foundUser = await User.findOne({
                where: {
                    email: email,
                },
            });

            if (!foundUser) {
                throw { name: `UserNotFound` };
            }

            if (foundUser.role !== `normalUser`) {
                throw { name: `notCustomer` }
            }

            const passwordTrue = comparePw(password, foundUser.password);

            if (!passwordTrue) {
                throw { name: `UserNotFound` };
            }

            const payloadForClient = {
                id: foundUser.id,
            };

            const token = convertPayloadToToken(payloadForClient);

            res.status(200).json({
                statusCode: 200,
                data: {
                    accessToken: token,
                    authorId: foundUser.id,
                    displayEmail: foundUser.email,
                    displayRole: foundUser.role,
                },
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async createReport(req, res, next) {
        try {
            let { imageUrl, description, latitude, longitude } = req.body;

            if(!imageUrl){
                imageUrl = `https://www.researchgate.net/profile/Sushma-Srinivas/publication/257632644/figure/fig15/AS:392608498110472@1470616568575/Damaged-road-due-to-Christchurch-earthquake-Photo.png`
            }
            const UploaderId = req.user.id;

            const createdReport = await Report.create({
                imageUrl, description, latitude, longitude, UploaderId
            });

            res.status(201).json({
                statusCode: 201,
                message: "Report created successfully",
                data: createdReport,
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async getAllReport(req, res, next) {
        try {
            const report = await Report.findAll({ include: [User], order: [[`id`, `asc`]] });
            res.status(200).json({
                statusCode: 200,
                data: report,
            });
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async getReportById(req, res, next) {
        try {
            const { id } = req.params
            let reportFound = await Report.findByPk(id, {
                include: [User]
            })

            if (!reportFound) {
                throw { name: `id_not_found` };
            }

            res.status(200).json({
                statusCode: 200,
                data: reportFound,
                // qr: data.qrcode
            });
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async getMyReport(req, res, next) {
        try {

            let options = { 'UploaderId': +req.user.id }
            const report = await Report.findAll({
                include: [User],
                order: [[`id`, `asc`]],
                where: options,
            });

            res.status(200).json({
                statusCode: 200,
                data: report,
            });
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async uploadImage(req, res, next) {
        try {
            console.log(req.body,`ini req body`)

            // let data = req.body.image
            // console.log(data,`<< dar req body`)

            // let = await axios({
            //     method: `POST`,
            //     data: { image: this.file },
            //     url: `https://api.imgbb.com/1/upload?key=bfa34a461b05455ebe471a04be341154`
            // })

            // console.log(img)

            res.status(200).json({
                statusCode: 200,
            });
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = publicController