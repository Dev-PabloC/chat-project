import { describe, it, expect, beforeAll, afterAll } from "vitest"
import userRepository from "./user.repository"
import prisma from "../../infra/database/database"


describe('TEST: user repository', () => {
    beforeAll(async () => {
        await prisma.user.deleteMany({ where: { email: 'test@gmail.com' } })
    })

    it('save user', async () => {
        const user = await userRepository.saveUser({
            username: 'test',
            email: 'test@gmail.com',
            password: '123456'
        })

        expect(user).toMatchObject({ username: 'test', email: 'test@gmail.com' })
    })

    it('verify email exist', async () => {
        const emailExist = await userRepository.getUserByEmail('test@gmail.com')

        expect(emailExist).toMatchObject({ email: 'test@gmail.com' })
    }),

        it('update user', async () => {
            const update = await userRepository.updateUser('test@gmail.com', { username: 'kiro', password: '00000000' })

            expect(update).toMatchObject({ username: 'kiro', email: 'test@gmail.com' })
        })

    it('auth method', async () => {
        const token = await userRepository.authMethod('test@gmail.com', '00000000')

        expect(token).toBeTypeOf("string")

    })

    afterAll(async () => {
        await prisma.user.deleteMany({ where: { email: 'test@gmail.com' } })
    })
})