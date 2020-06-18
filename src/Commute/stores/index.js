import { CommuteService } from '../services/CommuteService'
import { FixtureService } from '../services/FixtureService'
import { PaginationStore } from '../../Common/stores/PaginationStore'

import { RequestStore } from './RequestStore'
import { ShareStore } from './ShareStore'
import { CommuteStore } from './CommuteStore'

const commuteService = new CommuteService()
const fixtureService = new FixtureService()

const changableService = fixtureService // change the service here

const requestStore = new RequestStore(changableService)
const shareStore = new ShareStore(changableService)
const commuteStore = new CommuteStore(changableService, PaginationStore)

export default {
   requestStore,
   shareStore,
   commuteStore
}
