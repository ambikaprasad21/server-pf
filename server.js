const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
// const sendEmail = require("./email");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Replace these with your email credentials
const emailUser = process.env.EMAIL_USERNAME;
const emailPass = process.env.EMAIL_PASSWORD;
const myEmail = "akashboard2021@gmail.com";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.post("/submit-form", (req, res) => {
  const { fullName, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: "akashboard2021@gmail.com",
    subject: "New Form Submission: portfolio",
    text: `Full Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
