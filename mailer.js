const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendMail(emails) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD, // ⚠️ Use App Password
    },
  });

  for (let email of emails) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Job Application",
        text: "Hello, I am applying for the role. Please find my resume attached.",
        attachments: [
          {
            filename: "resume.pdf",
            path: "./resume.pdf", // keep resume in project folder
          },
        ],
      });

      console.log("Mail sent to:", email);
    } catch (err) {
      console.log("Failed for:", email);
    }
  }
}

module.exports = sendMail;