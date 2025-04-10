"use strict";
// import { db } from "../db";
// import { usersTable } from "../db/schema";
// import { eq } from "drizzle-orm";
// export const updateName = async (userId, newName) => {
//   const user = await db
//     .update(usersTable)
//     .set({ name: newName })
//     .where(eq(usersTable.id, userId))
//     .returning();
//   if (user.length === 0) {
//     throw new Error("User not found");
//   }
//   return user[0];
// }
