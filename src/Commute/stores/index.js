import { CommuteService } from '../services/CommuteService'
import { FixtureService } from '../services/FixtureService'

import { RequestStore } from './RequestStore'
import { ShareStore } from './ShareStore'
import { CommuteStore } from './CommuteStore'

const commuteService = new CommuteService()
const fixtureService = new FixtureService()

const requestStore = new RequestStore(fixtureService)
const shareStore = new ShareStore(fixtureService)
const commuteStore = new CommuteStore(fixtureService)

export default {
   requestStore,
   shareStore,
   commuteStore
}
