const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const stripe = require("stripe")('sk_test_51LD3zSGsdBMqOjdKPg8LxPZxF4ylvxmDO689Jk0RqsHR2wE0EFh9OCAmbBfvxEJ4kdKeN9xL03xqVzgkVkYzBjQj00pndb8A8E');

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Booking for Rental',
                    },
                    unit_amount: 2000,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:8080/success',
        cancel_url: 'http://localhost:8080/cancel',
    });
    res.json({
        url: session.url
    })
    console.log(session);
});

app.use(require('./routers/operator'))
app.use(require('./routers/player'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})