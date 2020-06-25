import { CommuteAPI } from '../services/CommuteService/CommuteAPI'
import { FixtureService } from '../services/CommuteService/CommuteFixture'
import { PaginationStore } from '../../Common/stores/PaginationStore'

import { RequestStore } from './RequestStore'
import { ShareStore } from './ShareStore'
import { CommuteStore } from './CommuteStore'

const commuteService = new CommuteAPI()
const fixtureService = new FixtureService()

const changableService = fixtureService // change the service here

const requestStore = new RequestStore(changableService)
const shareStore = new ShareStore(changableService)
const commuteStore = new CommuteStore(changableService)

export default {
   requestStore,
   shareStore,
   commuteStore
}
