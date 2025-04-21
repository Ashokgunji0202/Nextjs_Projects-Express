import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}) => {
  try {
    const hashedToken = await bcrypt.hash(userId, 10);

    // Update user with token info
    if (emailType === "VERIFY") {
      await prisma.user.update({
        where: { id: userId },
        data: {
            verifyToken: hashedToken,
            verifyTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    } else if (emailType === "RESET") {
      await prisma.user.update({
        where: { id: userId },
        data: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "dd3bbbe3bed5d9",
        pass: "b3c3d73d8f83af",
      },
    });

    const link =
      emailType === "VERIFY"
        ? `http://localhost:3000/verifyemail/${userId}?token=${hashedToken}`
        : `http://localhost:3000/resetpassword/${userId}?token=${hashedToken}`;

    const mailOptions = {
      from: "21ne5a0225@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your Email" : "Reset your Password",
      html: `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
          <h2 style="text-align: center; color: teal;">${
            emailType === "VERIFY" ? "Verify your Email" : "Reset your Password"
          }</h2>
          <p style="text-align: center;">
            Click the link below to ${
              emailType === "VERIFY" ? "verify your email" : "reset your password"
            }.
          </p>
          <a href="${link}" style="background: crimson; text-decoration: none; color: white; padding: 10px 15px;">
            ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
          </a>
        </div>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return {
      emailSent: mailResponse.accepted[0],
      previewUrl: nodemailer.getTestMessageUrl(mailResponse),
    };
  } catch (error: any) {
    console.error("Error sending email:", error);
    throw new Error("Email could not be sent");
  }
};