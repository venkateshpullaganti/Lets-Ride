import { CommuteService } from '../services/CommuteService'

import { RequestStore } from './RequestStore'
import { ShareStore } from './ShareStore'

const commuteService = new CommuteService()

const requestStore = new RequestStore(commuteService)
const shareStore = new ShareStore(commuteService)

export default {
   requestStore,
   shareStore
}
