import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'clientes',
            columns: [
                { name: 'nome', type: 'string' },
                { name: 'email', type: 'string' },
                { name: 'cgc', type: 'string' },
                { name: 'estado', type: 'string' },
                { name: 'cidade', type: 'string' },
                { name: 'endereco', type: 'string' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
                { name: 'deleted_at', type: 'number', isOptional: true },
            ],
        }),
    ]
})