const transport = require("./smtpTransport");
const { EMAIL_USER } = require("../config/index");

const sendOtpToUser = (otp, email) => {
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "OTP Verification",
    html: `<h1>Your OTP is ${otp}</h1>`,
  };

  transport.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully");
    }
  });
};

const sendPasswordResetToken = (otp, email) => {
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "OTP Verification",
    html: `<h1>Your OTP is ${otp}</h1>`,
  };

  transport.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully");
    }
  });
};

module.exports = { sendOtpToUser, sendPasswordResetToken };
