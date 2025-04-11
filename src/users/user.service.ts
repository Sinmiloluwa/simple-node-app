import { send } from "process";
import { db } from "../db";
import { usersTable, tokensTable } from "../db/schema";
import { eq } from "drizzle-orm";
import * as mailer from "nodemailer";
import { BadRequestException } from "../exceptions/BadRequestException";

export const updateName = async (userId: number, newName: string) => {

  const user = await db
    .update(usersTable)
    .set({ name: newName })
    .where(eq(usersTable.id, userId))
    .returning();

  if (user.length === 0) {
    throw new Error("User not found");
  }

  return user[0];
}

export const sendForgotPassword = async (email: string) => {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (user.length === 0) {
    throw new BadRequestException("User not found");
  }

    const token = Math.random().toString(20).substring(2, 15);
    await db.insert(tokensTable).values({
        userId: user[0].id,
        token: token,
        createdAt: Math.floor(Date.now() / 1000),
        expiresAt: Math.floor(Date.now() / 1000) + 3600,
    });

    sendEmail(email, user[0].password);
}

async function sendEmail(email: string, token: string) {
    const transporter = mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: false,
        auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
        },
    });
    
    const mailOptions = {
        from: process.env.MAIL_FROM,
        to: email,
        subject: "Reset Password",
        text: `Click the link to reset your password: ${process.env.APP_URL}/reset-password/${token}`,
    };
    
    await transporter.sendMail(mailOptions);
}
