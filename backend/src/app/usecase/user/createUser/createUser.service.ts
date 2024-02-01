import { responseType } from "../../../../utils/promisesType/responseType";
import { User } from "../../../../domain/user.entity";
import userRepository from "../../../repository/user.repository";

export async function createUserService(data: User): Promise<responseType> {
    try {
        // verificando se o email já existe
        const emailExist = await userRepository.verifyDuplicateEmail(data.email)

        if (emailExist) {
            return { httpCode: 400, message: 'Esse email já está sendo utilizado' }
        }

        //salvando no banco de dados
        const result = await userRepository.saveUser(data)

        if (!result) {
            return { httpCode: 503, message: 'Não foi possivel criar o usuario' }
        }

        return { httpCode: 201, message: 'Usuario criado', data: result }
    } catch (error) {
        return { httpCode: 500, message: 'Erro ao criar o usuário', error: error }
    }
}