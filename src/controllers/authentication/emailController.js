const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const ck = require('ckey');
const sendEmail = asyncHandler(async (req, res) => {
    let html = '';
    const {from, subject, nom, prenom, telephone, message, to} = req.body.data;
    let transporter = nodemailer.createTransport({
        host: ck.HOST_SMTP,
        port: ck.PORT_SMTP,
        secure: false, // true for 465, false for other ports
        auth: {
            user: ck.USER_SMTP,
            pass: ck.PASSWORD_SMTP
        },
    });
    html = `<h2>Mr ${nom} ${prenom}</h2><br> Telephone : ${telephone} - Email : ${from}<br><br><h2>${subject}</h2><br>${message}`

    if (!['add_user', 'update_password', 'contacts'].includes(req.body.service)) {
        const {societe, adresse, cp, ville} = req.body.data;
        html += `<br><h2> Société : ${societe}<br> Adresse : ${adresse}, ${cp}, ${ville} </h2>`
    }

    try {
        // send mail with defined transport object
        await transporter.sendMail({
            from, // sender address
            to: to ? to : ck.EMAIL_ADMIN_SMTP, // list of receivers
            subject, // Subject line
            html // html body
        });
        if (['add_user','update_password'].includes(req.body.service)) {
            return;
        }
        res.status(200).json({message: "Votre message a été envoyé avec succès"})
    } catch (e) {
        throw  new Error(e);
    }

});
module.exports = {
    sendEmail
};