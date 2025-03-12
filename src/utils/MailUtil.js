//simply focus on the flow of 
// to,from,subject,text       and you will get that what's going on and how


const mailer = require('nodemailer');


const sendingMail = async(to,subject,text) => {

    const transporter = mailer.createTransport({
        service: 'gmail',
        auth:{
            user:"harshilpanchal51321@gmail.com",
            pass:"ulif xhly wgcd qatt"
        }
    })

    const mailOptions = {
        from: 'harshilpanchal51321@gmail.com',
        to: to,
        subject: subject,
        text: text
        //html:"<h1>"+text+"</h1>"
    }

    const mailresponse = await transporter.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;

}

module.exports ={
    sendingMail
}