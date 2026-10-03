/**
 * @file user.repository.ts
 * @description user repository
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 3rd October
*/
import { eq } from "drizzle-orm";


import { db } from "@/config/db";
import { users } from "@/database/schema/user-schema";
import { hashPassword } from "@/shared/lib/password";
import type { signUpDTO } from "@/shared/validations/user-validation";
import type { UserType } from "./user.types";

const create = async (data: signUpDTO) => {
  const password_hash = await hashPassword(data.password);

  const [user] = await db
    .insert(users)
    .values({
      first_name: data.first_name,
      last_name: data.last_name,
      user_name: data.user_name,
      email: data.email,
      password_hash,
    })
    .returning();
  return user;
};

const findById = async (id: string) => {
  const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return user;
};

const findAllUser = async () => {
  const usersList = await db.select().from(users);
  return usersList;
};

const findByEmail = async (email: string) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  return user;
};
const updateUser = async (id: string, data: Partial<UserType>) => {
  const [user] = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();
  return user;
};
const deleteUser = async (id: string) => {
  const [user] = await db.delete(users).where(eq(users.id, id)).returning();
  return user;
};
export const userRepository = {
  create,
  findByEmail,
  findById,
  updateUser,
  deleteUser,
};
