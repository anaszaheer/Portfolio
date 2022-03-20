const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const path = require('path')
const port = 3000
const nodemailer = require('nodemailer');

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/')))

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('layouts/main')
})

app.post('/email', (req, res) => {

    // console.log(req.body)

    //sending email
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'm.anas.zaheer@gmail.com',
            pass: 'tanxdlycrmhgpbwf'
        }
    });

    let mailOptions = {
        from: req.body.senderEmail,
        to: 'm.anas.zaheer@gmail.com',
        subject: req.body.senderSubject,
        text: req.body.senderMessage
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error.message);
        }
        else {
            res.redirect('/');
            // console.log('Email sent: ' + info.response);
        }
    });

});


app.listen(port, console.log(`listening at port: ${port}`))