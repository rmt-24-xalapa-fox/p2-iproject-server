const nodemailer = require("nodemailer");

function sendEmail(email, value1, value2) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "randychan35@gmail.com",
      pass: "ehvdovnblfkpenzy",
    },
  });

  let mailOptions

  if (value2 === null) {
     mailOptions = {
      from: "randychan35@gmail.com",
      to: email,
      subject: "Music Yuhu",
      text: `HAI ${value1}, Terima Kasih telah mendaftar.`,
    };
  }

  if (value1 === null) {
     mailOptions = {
      from: "randychan35@gmail.com",
      to: email,
      subject: "Music Yuhu",
      text: `Thank you, here is your token ${value2}`,
    };
  }

  transporter.sendMail(mailOptions);
}

module.exports = {
  sendEmail,
};
