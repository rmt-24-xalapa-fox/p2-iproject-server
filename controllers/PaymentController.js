const axios = require('axios');
class PaymentController {
    
    static async generateUrl(req,res,next) {
    try {
        // you can change the config with your business details
        // let ammount = data.ammount;
        let invoice;
        let ammount = 90000;
        let invoiceData = {
            payer_email: 'invoice+demo@xendit.co',
            description: 'Checkout Demo'
        }
        console.log(req.body.redirect_url);
        const data = {
            invoiceData,
            external_id: `checkout-demo-${+new Date()}`,
            currency: 'IDR',
            amount: ammount,
            failure_redirect_url: req.body.redirect_url,
            success_redirect_url: req.body.redirect_url
        };

        let url = process.env.API_GATEWAY_URL + '/v2/invoices';
    let headers = {
        'Content-Type': 'application/json'
    }
    let auth = {
        username: process.env.API_KEY,
        password: ''
    }
    let timeout = 10000;
    const options = {
        method: 'POST',
        headers: headers,
        timeout: timeout,
        auth: auth,
        url: url,
        data
    };

    try {
        invoice= await axios(options);
    } catch (e) {
        throw e;
    }
        
        return res.status(200).send(invoice.data);
    } catch (e) {
        console.log(e);
        return res.status(404).send(e);
    }
}
    
}

module.exports = PaymentController