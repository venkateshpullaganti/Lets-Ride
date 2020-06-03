import React from 'react'

import { ProtectedRoute } from '../../Common/ProtectedRoute'

import {
   HOMEPAGE_PATH,
   RIDE_REQUEST_PATH,
   ASSET_TRANSPORT_REQUEST_PATH,
   SHARE_RIDE_PATH,
   SHARE_TRAVEL_INFO_PATH
} from '../constants/NavigationConstants'

import { CommuteHomeRoute } from './CommuteHomeRoute'
import { RideRequestRoute } from './RideRequestRoute'
import { ShareRideRoute } from './ShareRideRoute'
import { AssetTransportRequestRoute } from './AssetTransportRequestRoute'
import { ShareTravelInfoRoute } from './ShareTravelInfoRoute'

const routes = [
   <ProtectedRoute
      exact
      path={HOMEPAGE_PATH}
      key={HOMEPAGE_PATH}
      component={CommuteHomeRoute}
   />,
   <ProtectedRoute
      exact
      path={RIDE_REQUEST_PATH}
      key={RIDE_REQUEST_PATH}
      component={RideRequestRoute}
   />,
   <ProtectedRoute
      exact
      path={SHARE_RIDE_PATH}
      key={SHARE_RIDE_PATH}
      component={ShareRideRoute}
   />,
   <ProtectedRoute
      exact
      path={ASSET_TRANSPORT_REQUEST_PATH}
      key={ASSET_TRANSPORT_REQUEST_PATH}
      component={AssetTransportRequestRoute}
   />,
   <ProtectedRoute
      exact
      path={SHARE_TRAVEL_INFO_PATH}
      key={SHARE_TRAVEL_INFO_PATH}
      component={ShareTravelInfoRoute}
   />
]

export default routes
