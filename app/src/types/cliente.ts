export interface Cliente {
    id: string;
    nome: string;
    email: string;
    cgc: string;
    estado: string;
    cidade: string;
    endereco: string;
    criado: string;
    atualizado: string;
    deletado?: string;
}

export interface PageMetadata {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}

export interface Pageable {
    page: number;
    size: number;
    sort?: string[];
}

export interface PagedModelCliente {
    content: Cliente[];
    page: PageMetadata;
}
