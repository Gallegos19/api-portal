import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import prisma from "../database/prisma/client";

export class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    try {
      const userRecord = await prisma.user.findUnique({ where: { id } });
      if (!userRecord) return null;

      return this.mapToDomain(userRecord);
    } catch (error) {
      console.error("Error in findById:", error);
      return null;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const userRecord = await prisma.user.findUnique({ where: { email } });
      if (!userRecord) return null;

      return this.mapToDomain(userRecord);
    } catch (error) {
      console.error("Error in findByEmail:", error);
      return null;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const userRecords = await prisma.user.findMany();
      return userRecords.map(this.mapToDomain);
    } catch (error) {
      console.error("Error in findAll:", error);
      return [];
    }
  }

  async save(user: User): Promise<User> {
    try {
      const userData = user.toJSON();

      const savedUser = await prisma.user.create({
        data: {
          id: userData.id,
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          password: userData.password, // ← importante
          birth_date: userData.birth_date,
          sex: userData.sex,
          phone: userData.phone,
          role: userData.role,
          profile_photo_id: userData.profile_photo_id,
          created_at: userData.created_at
        }
      });

      return this.mapToDomain(savedUser);
    } catch (error) {
      console.error("Error in save:", error);
      throw error;
    }
  }

  async update(user: User): Promise<User> {
    try {
      const userData = user.toJSON();

      const updatedUser = await prisma.user.update({
        where: { id: userData.id },
        data: {
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          password: userData.password, // ← si se permite actualizar contraseña
          birth_date: userData.birth_date,
          sex: userData.sex,
          phone: userData.phone,
          role: userData.role,
          profile_photo_id: userData.profile_photo_id
        }
      });

      return this.mapToDomain(updatedUser);
    } catch (error) {
      console.error("Error in update:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.user.delete({ where: { id } });
    } catch (error) {
      console.error("Error in delete:", error);
      throw error;
    }
  }

  private mapToDomain = (record: any): User => {
    return User.create({
      id: record.id,
      first_name: record.first_name,
      last_name: record.last_name,
      email: record.email,
      password: record.password, // ← necesario si User.create lo requiere
      birth_date: record.birth_date ?? undefined,
      sex: record.sex ?? undefined,
      phone: record.phone ?? undefined,
      role: record.role ?? undefined,
      profile_photo_id: record.profile_photo_id ?? undefined,
      created_at: record.created_at
    });
  };
}
