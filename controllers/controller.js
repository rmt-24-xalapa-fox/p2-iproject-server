const {Company, Ticket, User, Payment} = require('../models')
const {createpassword, verifypassword, signtoken, verifytoken} = require('../helpers/helper')
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
const axios = require('axios')

class Controller{

    static async registerCompany(req, res, next){
        try{
            const company = await Company.create({
                email: req.body.email,
                password: createpassword(req.body.password),
                status: 'inactive'
            })
            var data = {
                "transaction_details": {
                  "order_id": company.id.toString(),
                  "gross_amount": 50000
                },
                "credit_card": {
                  "secure": true
                },
                "usage_limit": 1,
                "enabled_payments": [
                  "credit_card",
                  "bca_va",
                  "indomaret",
                  "gopay"
                ],
                "item_details": [
                  {
                    "id": "pil-001",
                    "name": "Pillow",
                    "price": 50000,
                    "quantity": 1,
                    "brand": "Midtrans",
                    "category": "Furniture",
                    "merchant_name": "PT. Midtrans"
                  }
                ],
                "customer_details": {
                  "first_name": "John",
                  "last_name": "Doe",
                  "email": "john.doe@midtrans.com",
                  "phone": "+62181000000000",
                  "notes": "Thank you for your purchase. Please follow the instructions to pay."
                },
                "custom_field1": "custom field 1 content",
                "custom_field2": "custom field 2 content",
                "custom_field3": "custom field 3 content"
              }
              
              var config = {
                method: 'post',
                url: 'https://api.sandbox.midtrans.com/v1/payment-links',
                headers: { 
                  'Authorization': 'Basic U0ItTWlkLXNlcnZlci1WNm9GUFF5WXFheWFQbU80SU0wVmY2WVY6', 
                  'Accept': 'application/json', 
                  'Content-Type': 'application/json'
                },
                data : data
              };
              
              const payment = await axios(config)
              console.log(payment.data.payment_url)
              await Payment.create({
                payment_url: payment.data.payment_url,
                CompanyId: company.id
              })
            //   .then(function (response) {
            //     console.log(JSON.stringify(response.data));
            //   })
            //   .catch(function (error) {
            //     console.log(error.response);
            //   });
            res.status(201).json({
                id: company.id,
                email: company.email
            })
        }catch(err){
            console.log(err.response.data)
            next(err)
        }
    }

    static async registerUser(req, res, next){
        try{
            const {companyId} = verifytoken(req.body.token)
            const user = await User.create({
                email: req.body.email,
                password: createpassword(req.body.password),
                role: 'staff',
                CompanyId: companyId
            })
            res.status(201).json({
                id: user.id,
                email: user.email,
                role: user.role
            })
        }catch(err){
            next(err)
        }
    }

    static async loginuser(req, res, next){
        try{
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if(!user||!verifypassword(req.body.password, user.password)){
                throw {message: 'Invalid email/password'}
            }
            const payload = {
                userId: user.id
            }
            const access_token = signtoken(payload)
            res.status(200).json({access_token, role: user.role})
        }catch(err){
            console.log(err)
            next(err)
        }
    }

    static async logincompany(req, res, next){
        try{
            const company = await Company.findOne({
                where: {
                    email: req.body.email
                }
            })
            if(!company||!verifypassword(req.body.password, company.password)){
                throw {message: 'Invalid email/password'}
            }
            const payload = {
                userId: company.id,
                role: 'company'
            }
            const access_token = signtoken(payload)
            res.status(200).json({access_token})
        }catch(err){
            console.log(err)
            next(err)
        }
    }

    static async createticket(req, res, next){
        try{
            const user = await User.findByPk(req.userId)

            const ticket = await Ticket.create({
                SenderId: req.userId,
                ReceiverId: user.CompanyId,
                description: req.body.description,
                status: 'on-hold'
            })
            res.status(201).json({
                id: ticket.id,
                description: ticket.description,
                status: ticket.status
            })
        }catch(err){
            next(err)
        }
    }

    static async fetchtask(req, res, next){
        try{
            const user = await User.findByPk(req.userId)
            const tickets = await Ticket.findAll({
                include: User,
                where: {
                    ReceiverId: user.CompanyId,
                    status: {
                        [Op.not]: 'completed'
                    }
                }
            })
            res.status(200).json({
                tickets
            }) 
        }catch(err){
            next(err)
        }
    }

    static async fetchcompletedtask(req, res, next){
        try{
            const tickets = await Ticket.findAll({
                include: User,
                where: {
                    ReceiverId: req.userId,
                    status: 'completed'
                }
            })
            res.status(200).json({
                tickets
            }) 
        }catch(err){
            next(err)
        }
    }

    static async updateticket(req, res, next){
        try{
            const ticket = await Ticket.update({
                status: req.body.status
            },{
                where: {
                    id: req.params.ticketId
                }
            })
            res.status(200).json({
                message: `ticket with id ${ticket.id} updated`
            })
        }catch(err){
            next(err)
        }
    }

    static async sendinvite(req, res, next){

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.mail.yahoo.com',
            port: 465,
            service:'yahoo',
            secure: false,
            auth: {
               user: 'iprojectherdi@yahoo.com',
               pass: 'rrnwaxevqcemnxtb'
            },
            debug: false,
            logger: true 
        });
        const payload = {
            companyId : req.userId
        }
        const reg = signtoken(payload)
        console.log(payload)
        console.log(reg)
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'iprojectherdi@yahoo.com', // sender address
            to: req.body.email, // list of receivers
            subject: "Invitation", // Subject line
            //text: `<a href="http://localhost:3000/register?reg=${reg}">Invitation to use ticketing system</a>`, // plain text body
            html: `<a href="http://localhost:8080/register?reg=${reg}">Invitation to use ticketing system</a>`, // html body
        });
        res.status(200).json({info})
    }

    static async getcompanyusers(req, res, next){
        try{
            const users = await User.findAll({where: {
                CompanyId: req.userId
            }})
            res.status(200).json(users)
        }catch(err){
            next(err)
        }
    }

    static async asignadmin(req, res, next){
        try{
            await User.update({
                role: 'admin'
            },{
                where: {
                    id: req.params.userId
                }
            })
            res.status(200).json({message: `user ${req.params.userId} updated`})
        }catch(err){
            next(err)
        }
    }

    static async ticketslist(req, res , next){
        try{
            const tickets = await Ticket.findAll({
                include: User,
                where: {
                    SenderId: req.userId
                }
            })
            res.status(200).json(tickets)
        }catch(err){
            next(err)
        }
    }

    static async handlePayment(req, res, next){
        try{
            let order_id = req.body.order_id
            order_id = order_id.split('-')
            order_id = order_id[0]
            await Company.update({
                status: 'active'
            },{
                where: {
                    id: order_id
                }
            })
            res.status(200).json({
                message: 'payment confirmed'
            })
        }catch(err){
            next(err)
        }
    }
}

module.exports = Controller