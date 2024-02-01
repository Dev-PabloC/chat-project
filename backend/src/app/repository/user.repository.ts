import prisma from "../../infra/database/database";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User, updateUser } from "../../domain/user.entity";
import { PrismaClient } from "@prisma/client";

class UserRepository {
    constructor(private prisma: PrismaClient) { }
    async getUserByEmail(email: string) {
        return await this.prisma.user.findFirst({
            where: { email }, select: {
                id: true,
                email: true,
                username: true,
                password: false
            }
        })
    }

    async saveUser(user: User) {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        const prismaUser = await this.prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                password: hashedPassword
            }, select: {
                id: true,
                email: true,
                username: true,
                password: false
            }
        })
        return prismaUser
    }

    async updateUser(emailToken: string, { username, email, password }: updateUser) {
        const hashPassword = await bcrypt.hash(String(password), 10)

        const update = await this.prisma.user.update({
            where: { email: emailToken },
            data: {
                email,
                username,
                password: hashPassword
            },
            select: {
                id: true,
                username: true,
                email: true,
                password: false
            }
        })

        return update
    }



    async authMethod(email: string, password: string) {
        const data = await this.prisma.user.findUnique({ where: { email } })

        const verifyPassword = await bcrypt.compare(password, String(data?.password))

        if (verifyPassword === true) {
            const token: string = await jwt.sign({ id: data?.id, email: data?.email }, String(process.env.JWTSECRET), { expiresIn: '1d' })

            return token
        }
    }

    async deleteUser(email: string) {
        const deleted = await this.prisma.user.delete({ where: { email } })

        return deleted
    }
}




export default new UserRepository(prisma)