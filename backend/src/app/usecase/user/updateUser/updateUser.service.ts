import userRepository from "../../../repository/user.repository";
import { updateUser } from "../../../../domain/user.entity";
import { responseType } from "../../../../utils/promisesType/responseType";

export async function updateUserService(email: string, userDto: updateUser): Promise<responseType> {
    try {
        //verifica se o email que será atualizado não está sendo usado por outra conta
        const emailAlreadyInUse = await userRepository.getUserByEmail(String(userDto.email))

        if (emailAlreadyInUse) {
            return { httpCode: 400, message: 'Esse email já está sendo utilizado' }
        }

        if (email === userDto.email) {
            return { httpCode: 400, message: 'insira um email diferente do atual' }
        }

        // salva as atualizações no banco de dados
        const updateUserQuery = await userRepository.updateUser(email, userDto)

        if (!updateUserQuery) {
            return { httpCode: 503, message: 'Não foi possivel atualizar o usuario' }
        }

        return { httpCode: 200, message: 'Usuario atualizado', data: updateUserQuery }
    } catch (error) {
        return { httpCode: 500, message: 'Erro ao atualizar o usuario', error: error }
    }
}