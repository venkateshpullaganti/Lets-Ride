import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import { setAccessToken } from '../../utils/StorageUtils'

import { HOMEPAGE_PATH } from '../../../Commute/constants/NavigationConstants'
import { SIGN_IN_PATH } from '../../../Authentication/constants/NavigationConstants'

import { ProtectedRoute } from '.'
import { withRouter, Router } from 'react-router-dom'

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

describe('ProtectedRoute tests', () => {
   it('should redirect to the signin page on Not logged in', () => {
      const history = createMemoryHistory()
      history.push(HOMEPAGE_PATH)

      const {} = render(
         <Router history={history}>
            <ProtectedRoute path={HOMEPAGE_PATH} component={LocationDisplay} />
         </Router>
      )
      expect(history.location.pathname).toBe(SIGN_IN_PATH)
   })
   it('should should render the given component if already logged in', () => {
      const history = createMemoryHistory()
      history.push(HOMEPAGE_PATH)
      setAccessToken('sample token')

      const { getByText, getByTestId } = render(
         <Router history={history}>
            <ProtectedRoute path={HOMEPAGE_PATH} component={LocationDisplay} />
         </Router>
      )
      expect(history.location.pathname).toBe(HOMEPAGE_PATH)
      getByTestId('location-display')
      getByText(HOMEPAGE_PATH)
   })
})
