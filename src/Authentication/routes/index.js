import React from 'react'

import { SIGN_IN_PATH } from '../constants/NavigationConstants'

import { SignInRoute } from './SignInRoute'
import { Route } from 'react-router-dom'

const routes = [<Route exact path={SIGN_IN_PATH} component={SignInRoute} />]

export default routes
