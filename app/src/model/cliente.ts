import { Model } from '@nozbe/watermelondb'
import { date, nochange, readonly, text } from '@nozbe/watermelondb/decorators'

export default class Cliente extends Model {
    static table = 'clientes'

    @text('nome') nome!: string
    @text('email') email!: string
    @text('cgc') cgc!: string
    @text('estado') estado!: string
    @text('cidade') cidade!: string
    @text('endereco') endereco!: string

    // timestamps armazenados como number (epoch ms) no schema; aqui expostos como Date
    @nochange @readonly @date('created_at') created_at!: Date
    @readonly @date('updated_at') updated_at!: Date
    @readonly @date('deleted_at') deleted_at?: Date
}
