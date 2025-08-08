import Cliente from '@/model/cliente'
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { setGenerator } from '@nozbe/watermelondb/utils/common/randomId'
import * as Crypto from 'expo-crypto'
import { Platform } from 'react-native'
import migrations from './migrations'
import schema from './schema'

setGenerator(() => Crypto.randomUUID().replace(/-/g, ''));

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
    schema,
    // (You might want to comment it out for development purposes -- see Migrations documentation)
    migrations,
    // (optional database name or file system path)
    // dbName: 'myapp',
    // (recommended option, should work flawlessly out of the box on iOS. On Android,
    // additional installation steps have to be taken - disable if you run into issues...)
    jsi: Platform.OS === 'ios', /* Platform.OS === 'ios' */
    // (optional, but you should implement this method)
    onSetUpError: error => {
        console.error('WatermelonDB setup error:', error);
    }
})

// Then, make a Watermelon database from it!
const database = new Database({
    adapter,
    modelClasses: [Cliente],
})

export default database;

export const clientesCollection = database.get<Cliente>('clientes');
