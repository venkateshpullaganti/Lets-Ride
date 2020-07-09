import React, { lazy } from 'react'

import { SIGN_IN_PATH } from '../constants/NavigationConstants'

import { Route } from 'react-router-dom'

const SignInRoute = lazy(() => import('./SignInRoute'))

const routes = [
   <Route
      exact
      path={SIGN_IN_PATH}
      key={SIGN_IN_PATH}
      component={SignInRoute}
   />
]

export default routes
