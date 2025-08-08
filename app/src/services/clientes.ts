import axiosInstance from '@/lib/axios';
import { Cliente, Pageable, PagedModelCliente } from '@/types/cliente';
import { AxiosRequestConfig } from 'axios';

export class ClienteService {

    private static readonly CLIENTE_ENDPOINT = '/clientes';

    /**
     * Lista todos os clientes
     */
    static async listarTodos(config?: AxiosRequestConfig): Promise<Cliente[]> {
        try {
            const response = await axiosInstance.get<Cliente[]>(`${this.CLIENTE_ENDPOINT}`, config);
            return response.data;
        } catch (error) {
            console.error('Erro ao listar clientes:', error);
            throw error;
        }
    }

    /**
     * Lista clientes com paginação
     */
    static async listarComPaginacao(pageable: Pageable, config?: AxiosRequestConfig): Promise<PagedModelCliente> {
        try {
            const params = new URLSearchParams({
                page: pageable.page.toString(),
                size: pageable.size.toString(),
            });

            if (pageable.sort) {
                pageable.sort.forEach(sort => params.append('sort', sort));
            }

            const requestConfig: AxiosRequestConfig = {
                ...config,
                params: {
                    ...config?.params,
                    ...Object.fromEntries(params)
                }
            };

            const response = await axiosInstance.get<PagedModelCliente>(`${this.CLIENTE_ENDPOINT}/page`, requestConfig);
            return response.data;
        } catch (error) {
            console.error('Erro ao listar clientes com paginação:', error);
            throw error;
        }
    }

    /**
     * Busca cliente por ID
     */
    static async buscarPorId(id: string, config?: AxiosRequestConfig): Promise<Cliente> {
        try {
            const response = await axiosInstance.get<Cliente>(`${this.CLIENTE_ENDPOINT}/${id}`, config);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar cliente ${id}:`, error);
            throw error;
        }
    }

    /**
     * Cria um novo cliente
     */
    static async criar(cliente: Cliente, config?: AxiosRequestConfig): Promise<Cliente> {
        try {
            const response = await axiosInstance.post<Cliente>(`${this.CLIENTE_ENDPOINT}`, cliente, config);
            return response.data;
        } catch (error) {
            console.error('Erro ao criar cliente:', error);
            throw error;
        }
    }

    /**
     * Atualiza um cliente existente
     */
    static async atualizar(id: string, cliente: Cliente, config?: AxiosRequestConfig): Promise<Cliente> {
        try {
            const response = await axiosInstance.put<Cliente>(`${this.CLIENTE_ENDPOINT}/${id}`, cliente, config);
            return response.data;
        } catch (error) {
            console.error(`Erro ao atualizar cliente ${id}:`, error);
            throw error;
        }
    }

    /**
     * Deleta um cliente
     */
    static async deletar(id: string, config?: AxiosRequestConfig): Promise<void> {
        try {
            await axiosInstance.delete(`${this.CLIENTE_ENDPOINT}/${id}`, config);
        } catch (error) {
            console.error(`Erro ao deletar cliente ${id}:`, error);
            throw error;
        }
    }

    /**
     * Verifica se um cliente existe
     */
    static async existe(id: string, config?: AxiosRequestConfig): Promise<boolean> {
        try {
            const response = await axiosInstance.get<boolean>(`${this.CLIENTE_ENDPOINT}/${id}/exists`, config);
            return response.data;
        } catch (error) {
            console.error(`Erro ao verificar se cliente ${id} existe:`, error);
            throw error;
        }
    }

    /**
     * Conta o total de clientes
     */
    static async contar(config?: AxiosRequestConfig): Promise<number> {
        try {
            const response = await axiosInstance.get<number>(`${this.CLIENTE_ENDPOINT}/count`, config);
            return response.data;
        } catch (error) {
            console.error('Erro ao contar clientes:', error);
            throw error;
        }
    }
}