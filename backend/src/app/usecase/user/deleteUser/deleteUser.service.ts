import userRepository from "../../../repository/user.repository";
import { responseType } from "../../../../utils/promisesType/responseType";


export async function deleteUserService(email: string): Promise<responseType> {
    try {
        const query = await userRepository.deleteUser(email)

        if (!query) {
            return { httpCode: 403, message: 'Erro ao deletar o usuario' }
        }

        return { httpCode: 200, message: 'usuario deletado' }
    } catch (error) {
        return { httpCode: 503, message: 'Erro ao deletar usuario', error: error?.message }
    }
}