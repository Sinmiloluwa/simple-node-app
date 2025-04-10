import { db } from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { BadRequestException } from "../exceptions/BadRequestException";

type UserSignUp = {
    name: string;
    age: number;
    email: string;
    password: string;
} 

export const signup = async (userSignup: UserSignUp) => {
    const { name, age, email, password } = userSignup;
    console.log(email);
  
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
      console.log("Inserted user:", newUser);
  
    return newUser[0];
  };
  