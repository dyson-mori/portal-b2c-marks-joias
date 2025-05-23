import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
  attachments: [
    {
      filename: 'logo.png',
      path: 'https://res.cloudinary.com/doo9pfft1/image/upload/v1748014101/logo_bzgiot.png',
      cid: 'logo'
    }
  ]
});

export { transporter };