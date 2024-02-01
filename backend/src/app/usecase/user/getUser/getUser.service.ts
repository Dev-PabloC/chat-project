import userRepository from "../../../repository/user.repository";
import { responseType } from "../../../../utils/promisesType/responseType";

export async function getUserService(email: string): Promise<responseType> {
    try {
        const resultQuery = await userRepository.getUserByEmail(email)

        if (!resultQuery) {
            return { httpCode: 404, message: 'Não foi possivel encontrar o usuario' }
        }

        return { httpCode: 200, message: 'ok', data: resultQuery }
    } catch (error) {
        return { httpCode: 503, message: 'erro ao encontrar o usuario', error: error.message }
    }
}