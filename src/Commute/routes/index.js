import React from 'react'
import { ProtectedRoute } from '../../Common/ProtectedRoute'

import { CommuteHomeRoute } from './CommuteHomeRoute'
import { HOMEPAGE_PATH } from '../constants/NavigationConstants'

const routes = [
   <ProtectedRoute exact path={HOMEPAGE_PATH} component={CommuteHomeRoute} />
]

export default routes
