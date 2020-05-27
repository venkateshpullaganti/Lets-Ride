import React from 'react'

import { ProtectedRoute } from '../../Common/ProtectedRoute'

import {
   HOMEPAGE_PATH,
   RIDE_REQUEST_PATH,
   ASSET_TRANSPORT_REQUEST_PATH,
   RIDE_SHARE_PATH,
   SHARE_TRAVEL_INFO_PATH
} from '../constants/NavigationConstants'

import { CommuteHomeRoute } from './CommuteHomeRoute'
import { RideRequestRoute } from './RideRequestRoute'

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
   />
]

export default routes
