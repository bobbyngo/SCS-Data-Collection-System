let nodemailer = require('nodemailer');
const dotenv = require('dotenv').config({ path: 'utils/.env' });

module.exports = transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ngohuugiabao8980@gmail.com',
        pass: process.env.EMAIL_PWD,
    },
});
