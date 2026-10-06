/**
 * @file modules-repository.ts
 * @description modules API Controller
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October 2026
 */
import { modules } from "@/database/schema/modules-schema.ts";
import { db } from "@/config/db.ts";
import { eq } from "drizzle-orm";

class ModuleRepository {
  async create(data:typeof modules.$inferInsert){
    const [module] = await db.insert(modules).values((data)).returning()
    return module;
  }
  async findById(id:string){
    const [module] = await db.select().from(modules).where(eq(modules.id,id)).limit(1)
    return module;
  }
  async findAll(){
    return await db.select().from(modules)
  }
  async findByCourseId(course_id:string){
    const [module] = await db.select().from(modules).where(eq(modules.course_id,course_id))
    return module;
  }
  async findByIdAndUpdate(id:string, data:typeof modules.$inferInsert){
    const [module] = await db.update(modules).set(data).where(eq(modules.id,id)).returning();
    return module;
  }
  async findByIdAndDelete(id:string){
    const [module] = await db.delete(modules).where(eq(modules.id,id)).returning();
    return module;
  }
}

export { ModuleRepository };