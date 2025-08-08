import axiosInstance from '@/lib/axios';
import { LoginRequest, LoginResponse } from '@/types/auth';
import { AxiosRequestConfig } from 'axios';

export class AuthService {

    private static readonly AUTH_ENDPOINT = '/auth';

    /**
     * Realiza o login do usuário
     */
    static async login(credentials: LoginRequest, config?: AxiosRequestConfig): Promise<LoginResponse> {
        try {
            const response = await axiosInstance.post<LoginResponse>(`${this.AUTH_ENDPOINT}/login`, credentials, config);
            return response.data;
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error;
        }
    }
}