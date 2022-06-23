const nodemailer = require("nodemailer"); // Require the Nodemailer package
async function main() {
  // Send the email
  let info = await transporter.sendMail({
    from: '"James Swanson" <foo@example.com>',
    to: "", // Test email address
    subject: "I love SMTP!",
    text: "Here's a text version of the email.",
    html: "Here's an <b>HTML version</b> of the email.",
  });
  console.log("Message sent: %s", info.messageId); // Output message ID
  console.log("View email: %s", nodemailer.getTestMessageUrl(info)); // URL to preview email
}
// Catch any errors and output them to the console
main().catch(console.error);