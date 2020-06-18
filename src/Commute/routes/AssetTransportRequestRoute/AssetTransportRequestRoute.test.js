import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'
import { API_SUCCESS } from '@ib/api-constants'

import { AuthService } from '../../../Authentication/services/AuthService'
import userProfileFixture from '../../../Authentication/fixtures/getUserProfileFIxture.json'
import { AuthStore } from '../../../Authentication/stores/AuthStore'

import { CommuteService } from '../../services/CommuteService'
import { RequestStore } from '../../stores/RequestStore'
import strings from '../../i18n/strings.json'

import { AssetTransportRequestRoute } from '.'

describe('AssetTransportRequestRoute Tests', () => {
   let commuteAPI
   let requestStore
   let authAPI
   let authStore
   let stores

   beforeEach(() => {
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
      stores = { requestStore, authStore }
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should render loading state', async () => {
      const sourcePlace = 'sourceplace'
      const destinationPlace = 'test-destinationPlace'
      const dateAndTime = new Date()
      const assetCount = 3
      const assetType = ''
      const assetSensitivity = ''
      const whomToDeliver = 'venky-123343434'

      const {
         getByLabelText,
         getByText,
         getAllByPlaceholderText,
         debug
      } = render(
         <Provider {...stores}>
            <Router history={createMemoryHistory()}>
               <AssetTransportRequestRoute />
            </Router>
         </Provider>
      )
      await waitFor(() => {
         const sourcePlaceField = getByLabelText(strings.fromText)
         const destinationPlaceField = getByLabelText(strings.toText)
         const dateAndTimeFields = getAllByPlaceholderText(
            'Select Date and Time'
         )
         const assetCount = getByLabelText('NO OF ASSETS')
         const assetTypeField = getByLabelText('ASSET TYPE')
         const assetSensitivityField = getByLabelText('ASSET SENSITIVITY')
         const whomToDeliverField = getByLabelText('WHOM TO DELIVER')
         const requestBtn = getByText('REQUEST')

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
         fireEvent.change(assetCount, { target: { value: assetCount } })

         // fireEvent.click(requestBtn)
         // await waitFor(() => expect(requestBtn).toBeDisabled)
      })
   })

   // it('should render network failure state', async () => {
   //    const sourcePlace = 'source-place'
   //    const destinationPlace = 'test-destinationPlace'
   //    const dateAndTime = new Date()
   //    const assetCount = 3

   //    const mockLoadingPromise = new Promise(function(resolve, reject) {
   //       reject(new Error('error'))
   //    }).catch(() => {})

   //    const mockRideRequestApi = jest.fn()
   //    mockRideRequestApi.mockReturnValue(mockLoadingPromise)
   //    commuteAPI.rideRequest = mockRideRequestApi

   //    const { getByLabelText, getAllByPlaceholderText, getByText } = render(
   //       <Router history={createMemoryHistory()}>
   //          <AssetTransportRequestRoute requestStore={requestStore} />
   //       </Router>
   //    )
   //    const sourcePlaceField = getByLabelText(strings.fromText)
   //    const destinationPlaceField = getByLabelText(strings.toText)
   //    const dateAndTimeFields = getAllByPlaceholderText('Select Date and Time')
   //    const assetCount = getByLabelText(strings.noOfSeatsText)
   //    const requestBtn = getByText('REQUEST')

   //    fireEvent.change(sourcePlaceField, { target: { value: sourcePlace } })
   //    fireEvent.change(destinationPlaceField, {
   //       target: { value: destinationPlace }
   //    })
   //    fireEvent.change(dateAndTimeFields[0], { target: { value: dateAndTime } })
   //    fireEvent.change(assetCount, { target: { value: assetCount } })
   //    fireEvent.click(requestBtn)

   //    await waitFor(() => {
   //       getByText(/Retry/i)
   //    })
   // })
})
