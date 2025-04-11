import { db } from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";

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

export const forgotPassword = async (email: string) => {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (user.length === 0) {
    throw new Error("User not found");
  }
  
}
