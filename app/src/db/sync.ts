import { synchronize } from '@nozbe/watermelondb/sync';
import database from './index';

export async function mySync() {
    await synchronize({
        database,
        sendCreatedAsUpdated: true,
        pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
            console.log('Pulling data');
            return {
                changes: {},
                timestamp: {},
            } as any;
        },
        pushChanges: async ({ changes, lastPulledAt }) => {
            console.log('Pushing data');

            console.log(changes);

            // push changes to supabase
        },
    });
}
