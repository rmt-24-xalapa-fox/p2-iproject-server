const { compare } = require("../helpers/bcrypt");
const { payToToken } = require("../helpers/jwt");
const { Customer, Product, Bookmark } = require("../models/index");

const Xendit = require('xendit-node');
const x = new Xendit({ secretKey: "xnd_development_oKkjbgV7ImIUxESL88RVMArQI1ktYzvFzcRBsXtPNISBCCMMc2kfdWkC9tJDMl" });

const { Invoice } = x;
const invoiceSpecificOptions = {};
const i = new Invoice(invoiceSpecificOptions);

class CustomerController {
    static async registerCustomer(req, res, next) {
        try {
            const { name, username, email, password, phoneNumber, address } = req.body;
            console.log(name, username, email, password, phoneNumber, address);

            const createdCustomer = await Customer.create({
                name, username, email, password, phoneNumber, address
            });

            res.status(201).json({
                id: createdCustomer.id,
                email: createdCustomer.email
            });

        } catch (err) {
            console.log(err);
            // next(err);
        }
    }

    static async loginCustomer(req, res, next) {
        try {
            const { email, password } = req.body;
            const foundCustomer = await Customer.findOne({
                where: {
                    email: email
                }
            });

            if (!foundCustomer) {
                throw new Error('Not found customer');
            }

            const confirmedPassword = compare(password, foundCustomer.password);
            if (!confirmedPassword) {
                throw new Error('Invalid email or password');
            }

            const sentPayload = {
                id: foundCustomer.id
            };

            const token = payToToken(sentPayload);

            res.status(200).json({
                access_token: token
            });

        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async allProduct(req, res, next) {
        try {
            const allProduct = await Product.findAll();
            res.status(200).json({
                allProduct
            });
        } catch (err) {
            console.log(err);
        }
    }

    static async addProduct(req, res, next) {
        try {
            const { id } = req.cust;
            const { id: idProduct } = req.params;
            const foundData = await Product.findOne({
                where: {
                    id: idProduct
                }
            });
            const addedData = await Bookmark.create({
                name: foundData.name,
                CustomerId: id,
                ProductId: idProduct,
                qty: 0,
                status: "wishlist"
            });
            res.status(201).json({
                addedData
            });
        } catch (err) {
            console.log(err);
        }
    }

    static async getAllBookmark(req, res, next) {
        try {
            const { id } = req.cust;
            const allData = await Bookmark.findAll({
                where: {
                    CustomerId: id
                },
                include: {
                    model: Product
                }
            });
            res.status(200).json({
                allData
            });
        } catch (err) {
            console.log(err);
        }
    }

    static async detailProduct(req, res, next) {
        try {
            const { id } = req.params;
            const { id: custId } = req.cust;
            const foundProduct = await Product.findByPk(id);
            res.status(200).json(foundProduct);
        } catch (err) {
            console.log(err);
        }
    }

    static async addToCart(req, res, next) {
        try {
            const { id } = req.params;
            const { id: custId } = req.cust;
            const { qty } = req.body;
            const foundProduct = await Product.findByPk(id);
            let paidPrice = +qty * foundProduct.price;
            const addChart = await Bookmark.create({
                name: foundProduct.name,
                CustomerId: custId,
                ProductId: id,
                qty: qty,
                status: "cart"
            });
            res.status(201).json({
                name: foundProduct.name,
                imgUrl: foundProduct.imgUrl,
                qty: qty,
                paidPrice: paidPrice
            });
        } catch (err) {
            console.log(err);
        }
    }

    static async getAllCart(req, res, next) {
        try {
            const { id } = req.cust;
            const allCart = await Bookmark.findAll({
                include: {
                    model: Product,
                    attributes: ['price', 'imgUrl']
                },
                where: {
                    CustomerId: id
                }
            });
            let allCartFixed = allCart.map(el => {
                return { id: el.id, name: el.name, imgUrl: el.Product.imgUrl, qty: el.qty, paidPrice: el.Product.price * el.qty };
            });
            res.status(200).json(allCartFixed);
        } catch (err) {
            console.log(err);
        }
    }
    static async buyProduct(req, res, next) {
        try {
            const { id } = req.params;
            const { id: custId } = req.cust;
            const { qty } = req.body;
            console.log(qty, id, '===============');
            const foundProduct = await Product.findByPk(id);
            const foundCustomer = await Customer.findByPk(custId);

            const stockUpdate = await Product.update({
                stock: foundProduct.stock - +qty
            }, {
                where: {
                    id: id
                }
            }
            );

            const addProductToWislist = await Bookmark.create({
                name: foundProduct.name,
                CustomerId: custId,
                ProductId: id,
                qty: +qty,
                status: "buy"
            });

            let paidPrice = +qty * foundProduct.price;

            const invoice = await i.createInvoice({
                'externalID': `Pembayaran id ${custId}`,
                'amount': paidPrice,
                'description': 'Invoice Demo #123',
                'invoice_duration': 86400,
                'customer': {
                    'given_names': `${foundCustomer.username}`,
                    'surname': `${foundCustomer.name}`,
                    'email': `${foundCustomer.email}`,
                    'mobile_number': `${foundCustomer.phoneNumber}`,
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
                        'name': `${foundProduct.name}`,
                        'quantity': qty,
                        'price': `${foundProduct.price}`,
                        'url': foundProduct.imgUrl
                    }
                ],
                'fees': [
                    {
                        'type': 'ADMIN',
                        'value': 5000
                    }
                ]

            });
            res.status(200).json({
                name: foundProduct.name,
                qty: +qty,
                paidPrice: paidPrice,
                invoice: invoice
            });
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteBookmark(req, res, next) {
        try {
            const { id: idBookmark } = req.params;
            const { id: custId } = req.cust;
            const foundBookmark = await Bookmark.findByPk(idBookmark);

            const deleted = await Bookmark.destroy({
                where: {
                    id: +idBookmark
                }
            });
            if (deleted <= 0) {
                throw new Error('Not found Bookmark');
            }

            res.status(200).json({
                mesage: `Succes to delete ${foundBookmark.name} from bookmark`
            });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = CustomerController;