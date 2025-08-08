import { Cliente } from './cliente';

export interface ChangeObjectCliente {
    created: Cliente[];
    updated: Cliente[];
    deleted: string[];
}

export interface Changes {
    clientes: ChangeObjectCliente;
}

export interface SyncPullRequest {
    lastPulledAt?: number;
    schemaVersion: number;
    migration?: any;
}

export interface SyncPullResponse {
    changes: Changes;
    timestamp: string;
    clientesChange: ChangeObjectCliente;
}

export interface SyncPushRequest {
    changes: Changes;
    // timestamp: number;
}

export interface SyncPushResponse {
    changes: Changes;
    timestamp: string;
}
