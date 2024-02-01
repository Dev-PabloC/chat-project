import userRepository from "../../../repository/user.repository";
import { responseType } from "../../../../utils/promisesType/responseType";

export async function loginService(email: string, password: string): Promise<responseType> {
    try {
        const token = await userRepository.authMethod(email, password)

        if (!token) {
            return { httpCode: 401, message: 'Erro ao logar', error: 'verifique o email e senha e tente novamente' }
        }

        return { httpCode: 200, message: 'logado com sucesso', data: { token: token } }
    } catch (error) {
        return { httpCode: 503, message: 'Erro ao logar', error: error.message }
    }
}