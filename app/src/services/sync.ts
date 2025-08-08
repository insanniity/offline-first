import axiosInstance from '@/lib/axios';
import { SyncPullRequest, SyncPullResponse, SyncPushRequest, SyncPushResponse } from '@/types/sync';
import { AxiosRequestConfig } from 'axios';

export class SyncService {

    private static readonly SYNC_ENDPOINT = '/sync';

    /**
     * Puxa dados do servidor (Pull)
     */
    static async pull(request: SyncPullRequest, config?: AxiosRequestConfig): Promise<SyncPullResponse> {
        try {
            const requestConfig: AxiosRequestConfig = {
                ...config,
                data: request
            };

            const response = await axiosInstance.get<SyncPullResponse>(`${this.SYNC_ENDPOINT}`, requestConfig);
            return response.data;
        } catch (error) {
            console.error('Erro ao fazer pull de dados:', error);
            throw error;
        }
    }

    /**
     * Envia dados para o servidor (Push)
     */
    static async push(request: SyncPushRequest, config?: AxiosRequestConfig): Promise<SyncPushResponse> {
        try {
            const response = await axiosInstance.put<SyncPushResponse>(`${this.SYNC_ENDPOINT}`, request, config);
            return response.data;
        } catch (error) {
            console.error('Erro ao fazer push de dados:', error);
            throw error;
        }
    }
}