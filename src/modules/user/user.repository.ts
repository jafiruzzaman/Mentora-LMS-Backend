/**
 * @file user.repository.ts
 * @description user repository
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 3rd October 2026
 */

import { eq } from "drizzle-orm";

import { db } from "@/config/db";
import { users } from "@/database/schema/user-schema";
import type { signUpDTO } from "@/modules/auth/auth-validation";

export class UserRepository {
  async create(data: signUpDTO) {
    const [user] = await db
      .insert(users)
      .values({
        first_name: data.first_name,
        last_name: data.last_name,
        user_name: data.user_name,
        email: data.email,
        password_hash: data.password,
      })
      .returning();

    return user;
  }

  async findById(id: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return user;
  }

  async findByUserName(user_name: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.user_name, user_name))
      .limit(1);

    return user;
  }

  async findByEmail(email: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user;
  }

  async findAll() {
    return await db.select().from(users);
  }

  async update(id: string, data: Partial<typeof users.$inferInsert>) {
    const [user] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();

    return user;
  }

  async delete(id: string) {
    const [user] = await db.delete(users).where(eq(users.id, id)).returning();

    return user;
  }

  async findByResetPasswordToken(token: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.reset_password_verification_token, token))
      .limit(1);

    return user;
  }

  async findByVerificationToken(token: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email_verification_token, token))
      .limit(1);

    return user;
  }
}