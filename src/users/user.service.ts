import { send } from "process";
import { db } from "../db";
import { usersTable, tokensTable } from "../db/schema";
import { eq } from "drizzle-orm";
import * as mailer from "nodemailer";
import { BadRequestException } from "../exceptions/BadRequestException";
import bcrypt from "bcryptjs";

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

export const sendForgotPassword = async (email: string, url: string) => {
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

    sendEmail(email, url, token);
}

export const changePassword = async (token: string, newPassword: string) => {

    const tokenData = await db
        .select()
        .from(tokensTable)
        .where(eq(tokensTable.token, token));

    if (tokenData.length === 0) {
        throw new BadRequestException("Token not found");
    }
    if (tokenData[0].expiresAt < Math.floor(Date.now() / 1000)) {
        throw new BadRequestException("Token expired");
    }
    const userPassword = await db
        .select({ password: usersTable.password })
        .from(usersTable)
        .where(eq(usersTable.id, tokenData[0].userId));

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (userPassword[0].password === newPassword) {
        throw new BadRequestException("New password must be different from the old password");
    }

    const user = await db
        .update(usersTable)
        .set({ password: hashedPassword })
        .where(eq(usersTable.id, tokenData[0].userId))
        .returning();

    if (user.length === 0) {
        throw new BadRequestException("User not found");
    }
    await db
        .delete(tokensTable)
        .where(eq(tokensTable.token, token));
}            

async function sendEmail(email: string, url:string, token: string) {
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
        text: `Click the link to reset your password: ${url}/reset-password/${token}`,
    };
    
    await transporter.sendMail(mailOptions);
}
