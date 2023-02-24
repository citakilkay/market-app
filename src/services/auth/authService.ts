import http from "../httpService";

class AuthService {
    async authenticate() {
        const response = await http.post('/auth/login', {
            username: 'kminchelle',
            password: '0lelplR'
        });
        return response.data
    }
}

export default new AuthService()