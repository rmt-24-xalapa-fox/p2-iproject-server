const axios = require("axios");

const Xendit = require('xendit-node');
const x = new Xendit({ secretKey: "xnd_development_oKkjbgV7ImIUxESL88RVMArQI1ktYzvFzcRBsXtPNISBCCMMc2kfdWkC9tJDMl" });

const { Invoice } = x;
const invoiceSpecificOptions = {};
const i = new Invoice(invoiceSpecificOptions);

class api3rdPartyController {
    static async getDataYoutube(req, res, next) {
        try {
            const { query } = req.query;
            const api_key = "AIzaSyBfwPhJGqmhPJq6MrBb9uP3a8FYgD14N4U";
            const getDataYoutube = await axios.get(
                `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${api_key}`
            );
            let url = `https://www.youtube.com/embed/${getDataYoutube.data.items[0].id.videoId}?controls=0`;
            // url += getDataYoutube.data.items[0].id.videoId;
            res.status(200).json(url);
        } catch (err) {
            console.log(err);
        }
    }


    static async createInvoice(req, res, next) {
        try {
            const resp = await i.createInvoice({
                'externalID': 'payment-link-1',
                'amount': 100000,
                'description': 'Invoice Demo #123',
                'invoice_duration': 86400,
                'customer': {
                    'given_names': 'John',
                    'surname': 'Doe',
                    'email': 'johndoe@example.com',
                    'mobile_number': '+6287774441111',
                    'address': [
                        {
                            'city': 'Jakarta Selatan',
                            'country': 'Indonesia',
                            'postal_code': '12345',
                            'state': 'Daerah Khusus Ibukota Jakarta',
                            'street_line1': 'Jalan Makan',
                            'street_line2': 'Kecamatan Kebayoran Baru'
                        }
                    ]
                },
                'customer_notification_preference': {
                    'invoice_created': [
                        'whatsapp',
                        'sms',
                        'email',
                        'viber'
                    ],
                    'invoice_reminder': [
                        'whatsapp',
                        'sms',
                        'email',
                        'viber'
                    ],
                    'invoice_paid': [
                        'whatsapp',
                        'sms',
                        'email',
                        'viber'
                    ],
                    'invoice_expired': [
                        'whatsapp',
                        'sms',
                        'email',
                        'viber'
                    ]
                },
                'success_redirect_url': 'https://www.google.com',
                'failure_redirect_url': 'https://www.google.com',
                'currency': 'IDR',
                'items': [
                    {
                        'name': 'Air Conditioner',
                        'quantity': 1,
                        'price': 100000,
                        'category': 'Electronic',
                        'url': 'https://yourcompany.com/example_item'
                    }
                ],
                'fees': [
                    {
                        'type': 'ADMIN',
                        'value': 5000
                    }
                ]

            });
            res.status(200).json(resp);
            console.log(resp);

        } catch (err) {
            console.log(err);
        }
    }



    static async getXenditInvoice(req, res, next) {

    }
}

module.exports = api3rdPartyController;