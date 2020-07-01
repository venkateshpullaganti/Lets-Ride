import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { SIGN_IN_PATH } from '../../../Authentication/constants/NavigationConstants'

import { isLoggedIn } from '../../utils/AuthUtils/AuthUtils'

// interface ProtectedRouteProps {
//    component: React.ComponentType
//    path: string
// }

const ProtectedRoute = ({ component: Component, path, ...rest }) => (
   <Route
      {...rest}
      render={props =>
         isLoggedIn() ? (
            <Component {...props} />
         ) : (
            <Redirect
               to={{
                  pathname: SIGN_IN_PATH,
                  state: { from: path }
               }}
            />
         )
      }
   />
)
export { ProtectedRoute }
