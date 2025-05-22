const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: 'd3f11e1ec849f4',
    pass: '9dea48f77f8408'
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter.sendMail({
  from: 'sivakumaremts@gmail.com',
  to: 'sivaaiyammal@gmail.com',
  subject: 'Test Email',
  text: 'Sent via Gmail SMTP from Node.js'
}, (err, info) => {
  if (err) {
    return console.error('❌ Failed to send email:', err);
  }
  console.log('✅ Email sent:', info.response);
});
