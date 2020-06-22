import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import { HOMEPAGE_PATH, HOME_PREFIX } from '../../constants/NavigationConstants'

import { AuthService } from '../../../Authentication/services/AuthService'
import userProfileFixture from '../../../Authentication/fixtures/getUserProfileFIxture.json'
import { AuthStore } from '../../../Authentication/stores/AuthStore'

import { CommuteStore } from '../../stores/CommuteStore'
import { CommuteService } from '../../services/CommuteService'

import { CommuteHomeRoute } from '.'
import { Provider } from 'mobx-react'
import { Router } from 'react-router-dom'

describe('Commute Home Route Tests', () => {
   let commuteStore
   let commuteService
   let authAPI
   let authStore
   let stores
   beforeEach(async () => {
      commuteService = new CommuteService()
      commuteStore = new CommuteStore(commuteService)
      authAPI = new AuthService()
      authStore = new AuthStore(authAPI)

      const mockUserProfileSuccessPromise = new Promise(resolve =>
         resolve(userProfileFixture)
      )

      const mockUserProfile = jest.fn()
      mockUserProfile.mockReturnValue(mockUserProfileSuccessPromise)

      authAPI.userProfileApi = mockUserProfile
      await authStore.getUserProfile()
      stores = { authStore, commuteStore }
   })
   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should render loading state on fetching matching resuls', async () => {
      const history = createMemoryHistory()
      const matchingResultsRoute = HOMEPAGE_PATH
      history.push(matchingResultsRoute)

      const mockLoadingPromise = new Promise(_ => {})

      const mockMatchingResultsApi = jest.fn()
      mockMatchingResultsApi.mockReturnValue(mockLoadingPromise)
      commuteService.matchingResultsApi = mockMatchingResultsApi

      const { debug } = render(
         <Provider {...stores}>
            <Router history={history}>
               <CommuteHomeRoute />
            </Router>
         </Provider>
      )
      debug()
      await waitFor(() => {
         expect(history.location.pathname).toBe(HOMEPAGE_PATH)
      })
   })
})
