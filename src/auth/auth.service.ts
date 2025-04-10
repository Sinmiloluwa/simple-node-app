import { db } from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { BadRequestException } from "../exceptions/BadRequestException";
import { NotFoundException } from "../exceptions/NotFoundException";

type UserSignUp = {
    name: string;
    age: number;
    email: string;
    password: string;
} 

export const signup = async (userSignup: UserSignUp) => {
    const { name, age, email, password } = userSignup;
  
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
  
    if (user.length > 0) {
      throw new BadRequestException("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    userSignup.password = hashedPassword;
  
    const newUser = await db
      .insert(usersTable)
      .values(userSignup).returning();
  
    return newUser[0];
};

export const login = async (email: string, password: string) => {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
  
    if (user.length === 0) {
      throw new NotFoundException("User not found");
    }
  
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
  
    if (!isPasswordValid) {
      throw new BadRequestException("Invalid password");
    }
  
    return user[0];
}
  