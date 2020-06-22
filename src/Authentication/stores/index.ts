import { AuthService } from '../services/AuthService'
import { FixtureService } from '../services/FixtureService'

import { AuthStore } from './AuthStore'

const authService = new AuthService()
const fixtureService = new FixtureService()

const authStore = new AuthStore(fixtureService)

export default {
   authStore
}
