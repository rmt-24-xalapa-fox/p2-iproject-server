const axios = require('axios');
const Xendit = require('xendit-node');
const { Wallet,CoinBuy,CoinPrice,xenditcoinbuy } = require('../models');


class PaymentController {

    static async generateUrl(req, res, next) {
        try {
            const x = new Xendit({
                secretKey: process.env.API_KEY
            });
            const coin = await CoinPrice.findByPk(req.params.id);
            if (coin) {
                let wallet = await Wallet.findOne({where:{UserId:req.user.id}});
                let coinbuy= await CoinBuy.create({WalletId:wallet.id,CoinPriceId:coin.id});
                console.log(coin.price);
                const { Invoice } = x;
                const invoiceSpecificOptions = {};
                const external = 'checkout-demo-' + new Date();
                const i = new Invoice(invoiceSpecificOptions);
                i.createInvoice({
                    externalID: external,
                    payerEmail: 'invoice+demo@xendit.co',
                    description: 'Invoice for coin demo',
                    currency: 'IDR',
                    amount: coin.price,
                }).then(({ id }) => {
                    console.log(`Invoice created with ID: ${id}`);
                    res.status(200).json('https://checkout-staging.xendit.co/web/' + id);
                    xenditcoinbuy.create({CoinbuyId:coinbuy.id,xenditLink:id})
                    
                })


            } else {
                res.status(404).json({ message: "Not found" })
            }


        } catch (error) {
            console.log(error);
        }
    }
    static async getInvoice(req, res, next) {
        try {

            const x = new Xendit({
                secretKey: process.env.API_KEY
            });
            let { invoice_link } = req.body;
            
            let xenditcoin= await xenditcoinbuy.findOne({where:{xenditLink:invoice_link}});
            if(xenditcoin){
                const { Invoice } = x;
                const invoiceSpecificOptions = {};
                const external = 'checkout-demo-' + new Date();
                const i = new Invoice(invoiceSpecificOptions);
    
                const resp = await i.getInvoice({
                    invoiceID: invoice_link,
                  })
                if(resp){
                    if(resp.status=="SETTLED"){
                        res.status(200).json({ message: "Payment have been processed" })
                        let coinbuy = await CoinBuy.findByPk(xenditcoin.CoinbuyId);
                        if(coinbuy){
                            let wallet = await Wallet.findByPk(coinbuy.WalletId);
                            let coin= await CoinPrice.findByPk(coinbuy.CoinPriceId)
                            if(wallet && coin){
                                console.log(wallet.coin)
                                wallet.coin=wallet.coin+coin.coinAmmount;
                                console.log(wallet.coin)
                                wallet= await wallet.save();
                                coinbuy.destroy();
                                xenditcoin.destroy();
                            }
                        }
                    }else{
                        res.status(400).json({ message: "Payment not done" })
                    }
                }
            }else{
                res.status(404).json({ message: "Link not found" })
            }
           

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = PaymentController