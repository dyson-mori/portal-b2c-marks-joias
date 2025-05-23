import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  // service: "gmail",
  port: 2525,
  secure: false,
  auth: {
    user: '0945bdfdb12a8e',
    pass: 'c4f31899269cb9'
    // user: process.env.GOOGLE_APP_EMAIL,
    // pass: process.env.GOOGLE_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GOOGLE_APP_EMAIL,
//     pass: process.env.GOOGLE_APP_PASSWORD,
//   }
// });

export { transporter };