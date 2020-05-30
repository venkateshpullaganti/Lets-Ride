import { CommuteService } from '../services/CommuteService'
import { FixtureService } from '../services/FixtureService'

import { RequestStore } from './RequestStore'
import { ShareStore } from './ShareStore'

const commuteService = new CommuteService()
const fixtureService = new FixtureService()

const requestStore = new RequestStore(commuteService)
const shareStore = new ShareStore(commuteService)

export default {
   requestStore,
   shareStore
}
