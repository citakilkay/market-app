import http from "../httpService";
import { AuthDtoInput } from "./dto/authDtoInput";
import { AuthDtoOutput } from "./dto/authDtoOutput";

class AuthService {
    async authenticate(authModel: AuthDtoInput): Promise<AuthDtoOutput> {
        const response = await http.post('/auth/login', authModel);
        return response.data
    }
}

export default new AuthService()