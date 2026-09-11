import { Temporal } from "temporal-polyfill";
import type { User } from "../../../../domain/entities/User";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import { db } from "../../../../prisma/db";

export class PrismaUserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const user = await db.orm.public.User.first({email,})
        if (!user) return null
        return this.toDomain(user)
    }

    async findById(id: string): Promise<User | null> {
        const user = await db.orm.public.User.first({id,})
        if (!user)  return null
        return this.toDomain(user)
    }

    async create(user: User): Promise<User> {
        const createdUser = await db.orm.public.User.create({
            id: user.id,
            name: user.name,
            email: user.email,
            passwordHash: user.passwordHash,
            createdAt:Temporal.Instant.fromEpochMilliseconds(
                user.createdAt.getTime()
            )
        })
        return this.toDomain(createdUser)
    }

    private toDomain(user: {
            id: string;
            name: string;
            email: string;
            passwordHash: string;
            createdAt: {
            epochMilliseconds: number;
        }}): User {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                passwordHash: user.passwordHash,
                createdAt: new Date(user.createdAt.epochMilliseconds),
            }
    }
}