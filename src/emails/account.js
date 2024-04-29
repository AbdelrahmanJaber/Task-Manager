const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'sample_email@gmail.com',
        subject: 'Welcome Email',
        text: `Hello ${name}`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'sample_email@gmail.com',
        subject: 'Cancelation Email',
        text: `Good Bye ${name}`
    })
}

module.exports ={
    sendWelcomeEmail,
    sendCancelationEmail
}