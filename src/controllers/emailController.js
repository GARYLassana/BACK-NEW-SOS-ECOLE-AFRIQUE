const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const ck = require('ckey');
const sendEmail = asyncHandler(async (req, res) => {
    let html = '';
    const {from, subject, message, to} = req.body;
    let transporter = nodemailer.createTransport({
        host: ck.HOST_SMTP,
        port: ck.PORT_SMTP,
        secure: false, // true for 465, false for other ports
        auth: {
            user: ck.USER_SMTP,
            pass: ck.PASSWORD_SMTP
        },
    });
    // html = `<h2>Mr ${nom} ${prenom}</h2><br> Telephone : ${telephone} - Email : ${from}<br><br><h2>${subject}</h2><br>${message}`

    try {
        // send mail with defined transport object
        await transporter.sendMail({
            from, // sender address
            to: ck.EMAIL_ADMIN_SMTP, // list of receivers
            subject, // Subject line
            html : message // html body
        });
        res.status(200).json({message: "Votre message a été envoyé avec succès"})
    } catch (e) {
        throw  new Error(e);
    }

});
module.exports = {
    sendEmail
};