import { User } from "@/models/User";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

const sendEmail = async ({ emailAddress, emailType, userId }) => {
  try {
    const convertedId = userId.toString();
    const hashedToken = await bcryptjs.hash(convertedId, 10);
    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 5);

    const updateUserInformation =
      emailType === "emailValidation"
        ? {
            verifyToken: hashedToken,
            verifyTokenExpiry: tokenExpiry,
          }
        : {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: tokenExpiry,
          };

    await User.updateOne({ _id: userId }, { $set: updateUserInformation });

    // SEND EMAIL
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    //const tokenLink = `${process.env.NEXTAUTH_URL}/api/users/verify?type=${emailType}&token=${hashedToken}`;
    const tokenLink = `${process.env.NEXTAUTH_URL}/reset-password/?token=${hashedToken}`;
    // app url / api ? tokentype?=emailValidation&token=ourtoken

    const htmlBody = `
    <!doctype html>
    <html>
    <head>
       </head>
    <body>
    	<div class="card" style="background-color: #27272a;color:white; border-radius:20px; padding:20px; align-items:center;">
        <h1 style="color: red;">گپ کات</h1>
        </br>
        <span>لینک تایید :</span>
        </br>
        <a href=${tokenLink} target="_blank" style="color:red;">
        ${tokenLink}
        </a>
        
        </br>
        <h6>با سپاس</h6>
        <h6>GAPCUT.IR</h6>
    	</div>
    </body>
</html>`;

    const mailOptions = {
      from: process.env.EMAIL_SERVER_FROM, // sender address
      to: emailAddress, // list of receivers
      subject: emailType, // Subject line
      html:htmlBody, // html body
    };

    const emailSendInfo = await transporter.sendMail(mailOptions);
    //console.log("emailSendInfo", emailSendInfo);

    // http://localhost:3000/api/users/verify?type=emailValidation&token=$2a$10$.vRZqie1El3JdB1.uLnVG.KC1rgY3bWc.v7Or1HVY9xNqFZBBy0/C

    return emailSendInfo;
  } catch (error) {
    throw new Error(error?.message);
  }
};

export default sendEmail;
