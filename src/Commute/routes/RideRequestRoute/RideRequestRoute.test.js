import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'
import { API_SUCCESS } from '@ib/api-constants'

import { AuthService } from '../../../Authentication/services/AuthService'
import userProfileFixture from '../../../Authentication/fixtures/getUserProfileFIxture.json'
import { AuthStore } from '../../../Authentication/stores/AuthStore'

import strings from '../../i18n/strings.json'

import { CommuteService } from '../../services/CommuteService'

import { RequestStore } from '../../stores/RequestStore'

import { RideRequestRoute } from '.'

describe('RideRequestRoute Tests', () => {
   let commuteAPI
   let requestStore
   let authAPI
   let authStore
   let stores

   beforeEach(async () => {
      commuteAPI = new CommuteService()
      requestStore = new RequestStore(commuteAPI)

      authAPI = new AuthService()
      authStore = new AuthStore(authAPI)

      const mockUserProfileSuccessPromise = new Promise(resolve =>
         resolve(userProfileFixture)
      )

      const mockUserProfile = jest.fn()
      mockUserProfile.mockReturnValue(mockUserProfileSuccessPromise)

      authAPI.userProfileApi = mockUserProfile
      await authStore.getUserProfile()
      stores = { requestStore, authStore }
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should render loading state', async () => {
      const sourcePlace = 'sourceplace'
      const destinationPlace = 'test-destinationPlace'
      const dateAndTime = new Date()
      const seatCount = 3
      const {
         getByLabelText,
         getByText,
         getByRole,
         getAllByPlaceholderText,
         getByAltText
      } = render(
         <Provider {...stores}>
            <Router history={createMemoryHistory()}>
               <RideRequestRoute />
            </Router>
         </Provider>
      )

      const sourcePlaceField = getByLabelText(strings.fromText)
      const destinationPlaceField = getByLabelText(strings.toText)
      const dateAndTimeFields = getAllByPlaceholderText('Select Date and Time')
      const seatCountField = getByLabelText('NO.OF SEATS*')

      const requestBtn = getByRole('button', { name: 'REQUEST' })

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockRideRequestApi = jest.fn()
      mockRideRequestApi.mockReturnValue(mockLoadingPromise)
      commuteAPI.rideRequest = mockRideRequestApi

      fireEvent.change(sourcePlaceField, { target: { value: sourcePlace } })
      fireEvent.change(destinationPlaceField, {
         target: { value: destinationPlace }
      })
      fireEvent.change(dateAndTimeFields[0], {
         target: { value: dateAndTime }
      })
      fireEvent.change(seatCountField, { target: { value: seatCount } })

      fireEvent.click(requestBtn)

      await waitFor(() => {
         getByAltText('loader')
         expect(requestBtn).not.toBeInTheDocument()
      })
   })

   // it('should render network failure state', async () => {
   //    const sourcePlace = 'source-place'
   //    const destinationPlace = 'test-destinationPlace'
   //    const dateAndTime = new Date()
   //    const seatCount = 3

   //    const mockLoadingPromise = new Promise(function(resolve, reject) {
   //       reject(new Error('error'))
   //    }).catch(() => {})

   //    const mockRideRequestApi = jest.fn()
   //    mockRideRequestApi.mockReturnValue(mockLoadingPromise)
   //    commuteAPI.rideRequest = mockRideRequestApi

   //    const { getByLabelText, getAllByPlaceholderText, getByText } = render(
   //       <Router history={createMemoryHistory()}>
   //          <RideRequestRoute requestStore={requestStore} />
   //       </Router>
   //    )
   //    const sourcePlaceField = getByLabelText(strings.fromText)
   //    const destinationPlaceField = getByLabelText(strings.toText)
   //    const dateAndTimeFields = getAllByPlaceholderText('Select Date and Time')
   //    const seatCountField = getByLabelText(strings.noOfSeatsText)
   //    const requestBtn = getByText('REQUEST')

   //    fireEvent.change(sourcePlaceField, { target: { value: sourcePlace } })
   //    fireEvent.change(destinationPlaceField, {
   //       target: { value: destinationPlace }
   //    })
   //    fireEvent.change(dateAndTimeFields[0], { target: { value: dateAndTime } })
   //    fireEvent.change(seatCountField, { target: { value: seatCount } })
   //    fireEvent.click(requestBtn)

   //    await waitFor(() => {
   //       getByText(/Retry/i)
   //    })
   // })
})
