import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";

import asyncHandler from "../../middlewares/asyncHandler.js";
import OTP from "../../models/otpModel.js";

const sendOTPemail = asyncHandler(async ({ _id, email }, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const otp = await otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Spend Smart Account Verification OTP",
    html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          .header {
            background-color: #f4f4f4;
            padding: 10px;
            text-align: center;
          }
          .content {
            padding: 20px 0;
          }
          .footer {
            background-color: #f4f4f4;
            padding: 10px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>OTP Verification for Spend Smart Account</h2>
          </div>
          <div class="content">
            <p>Dear User,</p>
            <p>Your OTP for verifying your Spend Smart account is: <strong>${otp}</strong></p>
            <p>This OTP is valid for 1 minute. Please use it within this time period.</p>
            <p>If you did not request this OTP, please ignore this email.</p>
            <p>Thank you for choosing Spend Smart!</p>
          </div>
          <div class="footer">
            <p>This is an automated email, please do not reply.</p>
          </div>
        </div>
      </body>
    </html>
  `,
  };

  const salt = await bcrypt.genSalt(Number(process.env.ENCRYPTION_SALT));
  const hashedOTP = await bcrypt.hash(otp, salt);

  const newOTP = new OTP({
    userID: _id,
    otp: hashedOTP,
    expiresAt: Date.now() + 1 * 60 * 1000,
  });

  await newOTP.save();
  await transporter.sendMail(mailOptions);

  return res.json({
    message: "OTP sent successfully. Please check your inbox!",
    data: {
      userID: _id,
      email,
    },
  });
});

export default sendOTPemail;
