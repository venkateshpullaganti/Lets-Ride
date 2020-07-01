import React, { lazy } from 'react'

import { ProtectedRoute } from '../../Common/components/ProtectedRoute'

import {
   RIDE_REQUEST_PATH,
   ASSET_TRANSPORT_REQUEST_PATH,
   SHARE_RIDE_PATH,
   SHARE_TRAVEL_INFO_PATH,
   HOME_PREFIX
} from '../constants/NavigationConstants'

// import CommuteHomeRoute from './CommuteHomeRoute'
// import RideRequestRoute from './RideRequestRoute'
// import ShareRideRoute from './ShareRideRoute'
// import AssetTransportRequestRoute from './AssetTransportRequestRoute'
// import ShareTravelInfoRoute from './ShareTravelInfoRoute'

const CommuteHomeRoute = lazy(() => import('./CommuteHomeRoute'))
const RideRequestRoute = lazy(() => import('./RideRequestRoute'))
const ShareRideRoute = lazy(() => import('./ShareRideRoute'))
const AssetTransportRequestRoute = lazy(() =>
   import('./AssetTransportRequestRoute')
)
const ShareTravelInfoRoute = lazy(() => import('./ShareTravelInfoRoute'))

const routes = [
   <ProtectedRoute
      exact
      path={`${HOME_PREFIX}/:selectedTab`}
      key={HOME_PREFIX}
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
