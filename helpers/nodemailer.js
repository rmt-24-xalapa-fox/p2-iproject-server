const nodemailer = require('nodemailer');

function sendEmail(email){

    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "animewatchlist666@gmail.com",
        pass: "jwaylkxqopublbif"
    }
    });
    
    const options = {
        from : "animewatchlist666@gmail.com",
        to : `${email}`,
        subject: "Register at Anime Watchlist",
        text: `Register has been Success, enjoy our database`
    };
    
    
    transporter.sendMail(options, (err, info)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log("sent: " + info.response);
    })

}

module.exports = sendEmail