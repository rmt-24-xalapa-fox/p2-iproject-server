"use strict"

const CoreApi = require("../Midtrans/CoreApi")
const BankTransfer = require("./BankTransfer");
class IndexController{
    static async bankTransfer(req, res){
        try {
            let data;
            console.log(req, "<<<< req");
            let body = req.body;
            let customers = {
              email: "classicimplements@gmail.com",
              first_name: "CLASSIC",
              last_name: "IMPLEMENTS",
              phone: "089179179111",
            };

            let bankTransfer = await new BankTransfer(body.items, customers);
            console.log(bankTransfer, "<<< bank");
            switch (body.channel) {
              case "BCA":
                data = bankTransfer.bca();
                break;
              case "BNI":
                data = bankTransfer.bni();
                break;
              case "PERMATA":
                data = bankTransfer.permata();
                break;
            }
            // return data
            console.log(data, "<<<< data");
            await CoreApi.charge(data);
            console.log(await CoreApi.charge(data), "<<<< coreApi");;
            res.status(201).json(data);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = IndexController