import { ENCRYPTION_KEY } from '@/utils/constants'
import { MMKV, Mode } from 'react-native-mmkv'

export const storage = new MMKV({
    id: `user-storage`,
    encryptionKey: ENCRYPTION_KEY,
    mode: Mode.MULTI_PROCESS,
    readOnly: false
})