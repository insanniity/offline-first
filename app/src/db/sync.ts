import { SyncService } from '@/services/sync';
import { synchronize } from '@nozbe/watermelondb/sync';
import SyncLogger from '@nozbe/watermelondb/sync/SyncLogger';
import database from './index';

const logger = new SyncLogger(10)

console.log(logger.logs)

export async function mySync() {
    await synchronize({
        log: logger.newLog(),
        database,
        sendCreatedAsUpdated: false,
        pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
            console.log('Pulling data');
            const response = await SyncService.pull({
                lastPulledAt,
                schemaVersion,
                migration: encodeURIComponent(JSON.stringify(migration))
            });

            return {
                changes: response.changes,
                timestamp: new Date().getTime(),
            };
        },
        pushChanges: async ({ changes, lastPulledAt }) => {
            console.log('Pushing data');
            await SyncService.push({
                changes: changes as any,
            });

            // return {
            //     changes: response.changes,
            //     timestamp: response.timestamp,
            // };
        },
    });
}
