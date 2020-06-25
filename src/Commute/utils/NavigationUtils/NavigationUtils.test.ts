import React from 'react'
import { createMemoryHistory } from 'history'

import {
   HOMEPAGE_PATH,
   RIDE_REQUEST_PATH,
   ASSET_TRANSPORT_REQUEST_PATH,
   SHARE_TRAVEL_INFO_PATH,
   SHARE_RIDE_PATH
} from '../../constants/NavigationConstants'
import {
   goToHomePage,
   goToRideRequestPage,
   goToAssetRequestPage,
   goToShareTravelInfoPage,
   goToRideSharePage
} from './NavigationUtils'

describe('Navigation Utils tests', () => {
   let history
   beforeEach(() => {
      history = createMemoryHistory()
   })
   it('goToHomePage()', () => {
      goToHomePage(history)
      expect(history.location.pathname).toBe(HOMEPAGE_PATH)
   })
   it('goToRideRequestPage()', () => {
      goToRideRequestPage(history)
      expect(history.location.pathname).toBe(RIDE_REQUEST_PATH)
   })
   it('goToAssetRequestPage()', () => {
      goToAssetRequestPage(history)
      expect(history.location.pathname).toBe(ASSET_TRANSPORT_REQUEST_PATH)
   })
   it('goToShareTravelInfoPage()', () => {
      goToShareTravelInfoPage(history)
      expect(history.location.pathname).toBe(SHARE_TRAVEL_INFO_PATH)
   })
   it('goToRideSharePage()', () => {
      goToRideSharePage(history)
      expect(history.location.pathname).toBe(SHARE_RIDE_PATH)
   })
})
