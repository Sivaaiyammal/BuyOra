const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',       
  port: 587,                   
  secure: false,                
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

const sendOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendOtpEmail;
