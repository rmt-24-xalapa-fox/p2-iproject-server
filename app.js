const express = require('express')
const cors = require('cors')
const passport = require("passport")
const FacebookStrategy = require("passport-facebook").Strategy
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// fb login
passport.use(new FacebookStrategy({
    clientID: '1176345546521977',
    clientSecret: 'db3dda8a6f657e33a0a204a579051b0b',
    callbackURL: "http://localhost:3000/auth/facebook/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/secrets',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/secrets');
    });

const stripe = require("stripe")('sk_test_51LD3zSGsdBMqOjdKPg8LxPZxF4ylvxmDO689Jk0RqsHR2wE0EFh9OCAmbBfvxEJ4kdKeN9xL03xqVzgkVkYzBjQj00pndb8A8E');

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'idr',
                    product_data: {
                        name: 'Booking for Rental',
                    },
                    unit_amount: 5000000,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'https://ps-anywhere-fix.herokuapp.com/success',
        cancel_url: 'https://ps-anywhere-fix.herokuapp.com/cancel',
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