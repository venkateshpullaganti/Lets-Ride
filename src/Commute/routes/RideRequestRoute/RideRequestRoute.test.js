import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'

import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'
import { API_SUCCESS } from '@ib/api-constants'

import strings from '../../i18n/strings.json'

import { CommuteService } from '../../services/CommuteService'

import { RequestStore } from '../../stores/RequestStore'

import { RideRequestRoute } from '.'

describe('RideRequestRoute Tests', () => {
   let commuteAPI
   let requestStore

   beforeEach(() => {
      commuteAPI = new CommuteService()
      requestStore = new RequestStore(commuteAPI)
   })
   afterEach(() => {
      jest.resetAllMocks()
   })

   it('Should render sourcePlace empty error message', () => {
      const { getByText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <RideRequestRoute requestStore={requestStore} />
         </Router>
      )
      const requestBtn = getByRole('button', { name: strings.requestBtnText })
      fireEvent.click(requestBtn)
      getByText(strings.sourcePlaceError)
   })

   it('should render destination place empty error message', () => {
      const sourcePlace = 'krnl'
      const { getByText, getByRole, getByLabelText } = render(
         <Router history={createMemoryHistory()}>
            <RideRequestRoute requestStore={requestStore} />
         </Router>
      )
      const sourcePlaceField = getByLabelText(strings.fromText)
      const requestBtn = getByRole('button', { name: strings.requestBtnText })

      fireEvent.change(sourcePlaceField, { target: { value: sourcePlace } })
      fireEvent.click(requestBtn)
      getByText(strings.destinationPlaceError)
   })

   it('should render loading state', () => {
      const sourcePlace = 'sourceplace'
      const destinationPlace = 'test-destinationPlace'
      const { getByLabelText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <RideRequestRoute requestStore={requestStore} />
         </Router>
      )
      const sourcePlaceField = getByLabelText(strings.fromText)
      const destinationPlaceField = getByLabelText(strings.toText)
      const requestBtn = getByRole('button', { name: strings.requestBtnText })

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockRideRequestApi = jest.fn()
      mockRideRequestApi.mockReturnValue(mockLoadingPromise)
      commuteAPI.rideRequest = mockRideRequestApi

      fireEvent.change(sourcePlaceField, { target: { value: sourcePlace } })
      fireEvent.change(destinationPlaceField, {
         target: { value: destinationPlace }
      })
      fireEvent.click(requestBtn)

      waitFor(() => getByRole('button', { disabled: true }))
   })

   // it('should render network failure state', () => {
   //    const sourcePlace = 'source-place'
   //    const destinationPlace = 'test-destinationPlace'

   //    const mockLoadingPromise = new Promise(function(resolve, reject) {
   //       reject(new Error('error'))
   //    }).catch(() => {})

   //    const mockRideRequestApi = jest.fn()
   //    mockRideRequestApi.mockReturnValue(mockLoadingPromise)
   //    commuteAPI.rideRequest = mockRideRequestApi

   //    const { getByLabelText, getByRole } = render(
   //       <Router history={createMemoryHistory()}>
   //          <RideRequestRoute requestStore={requestStore} />
   //       </Router>
   //    )
   //    const sourcePlaceField = getByLabelText(strings.fromText)
   //    const destinationPlaceField = getByLabelText(strings.toText)
   //    const requestBtn = getByRole('button', { name: strings.requestBtnText })

   //    fireEvent.change(sourcePlaceField, { target: { value: sourcePlace } })
   //    fireEvent.change(destinationPlaceField, { target: { value: destinationPlace } })
   //    fireEvent.click(requestBtn)

   //    waitFor(() => {
   //       getByText(/NETWORK_ERROR/i)
   //    })
   // })
})
