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
const FormData = require('form-data');
const fs = require('fs');
const { get } = require("http");



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

            // console.log(req.file,`<<<< ini req file`)

            if (!imageUrl) {
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

        // console.log (`INI UPLOAD IMAGE`)
        try {

            // console.log(req.file, `ini req file`)
            let image = req.file
            // console.log(image, `<<ini image`)
            // console.log(req.headers)
            // console.log(image,`<<<<<<<<<<<<<< ini image`)

            let data = new FormData();
            data.append('image', Buffer.from(image.buffer).toString('base64'));

            console.log (data,`ini data <<<<<<<<<<<<`)
            let config = {
                method: 'post',
                url: `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_KEY}`,
                headers: {...data.getHeaders()},
                data: data
            };

            // console.log(config,`<<<<<<< ini config`)

            let img = await axios(config)

            console.log(img.data.data.url)



            res.status(200).json({
                statusCode: 200,
                imageUrl: img.data.data.url
            });
        } catch (err) {
            console.log(err.response.data);
            next(err)
        }
    }
}

module.exports = publicController