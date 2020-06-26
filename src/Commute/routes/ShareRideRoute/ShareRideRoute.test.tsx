import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'

import { createMemoryHistory } from 'history'

import strings from '../../i18n/strings.json'

import { CommuteService } from '../../services/CommuteService'

import { ShareStore } from '../../stores/ShareStore'

import { ShareRideRoute } from '.'
import { CommuteAPI } from '../../services/CommuteService/CommuteAPI'
import { Provider } from 'mobx-react'

describe('ShareRideRoute Tests', () => {
   let commuteAPI: CommuteService
   let shareStore: ShareStore

   beforeEach(() => {
      commuteAPI = new CommuteAPI()
      shareStore = new ShareStore(commuteAPI)
   })
   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should render loading state', () => {
      const sourcePlace = 'sourceplace'
      const destinationPlace = 'test-destinationPlace'
      const { getByLabelText, getByRole, getByText } = render(
         <Provider shareStore={shareStore}>
            <Router history={createMemoryHistory()}>
               <ShareRideRoute />
            </Router>
         </Provider>
      )
      const sourcePlaceField = getByLabelText(strings.fromText)
      const destinationPlaceField = getByLabelText(strings.toText)
      const shareBtn = getByText(strings.shareBtnText)

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockRideRequestApi = jest.fn()
      mockRideRequestApi.mockReturnValue(mockLoadingPromise)
      commuteAPI.rideRequest = mockRideRequestApi

      fireEvent.change(sourcePlaceField, { target: { value: sourcePlace } })
      fireEvent.change(destinationPlaceField, {
         target: { value: destinationPlace }
      })
      fireEvent.click(shareBtn)

      waitFor(() => expect(shareBtn).toBeDisabled)
   })

   // // it('should render error message on selecting Flexible timings and not from and to dates  ', () => {
   // //    const sourcePlace = 'krnl'
   // //    const destinationPlace = 'test-destinationPlace'

   // //    const { getByText, getByLabelText, getByRole } = render(
   // //       <Router history={createMemoryHistory()}>
   // //          <ShareRideRoute shareStore={shareStore} />
   // //       </Router>
   // //    )
   // //    const sourcePlaceField = getByLabelText(strings.fromText)
   // //    const destinationPlaceField = getByLabelText(strings.toText)
   // //    const checkBox = getByRole('checkbox')
   // //    const shareBtn = getByText(strings.shareBtnText)

   // //    fireEvent.change(sourcePlaceField, { target: { value: sourcePlace } })
   // //    fireEvent.change(destinationPlaceField, {
   // //       target: { value: destinationPlace }
   // //    })
   // //    fireEvent.click(checkBox)

   // //    fireEvent.click(shareBtn)
   // //    getByText('Required ')
   // // })

   it('should render loading state', async () => {
      const sourcePlace = 'sourceplace'
      const destinationPlace = 'test-destinationPlace'
      const dateAndTime = new Date()
      const seatCount = 3
      const { getByLabelText, getByText, getAllByPlaceholderText } = render(
         <Router history={createMemoryHistory()}>
            <ShareRideRoute shareStore={shareStore} />
         </Router>
      )
      const sourcePlaceField = getByLabelText(strings.fromText)
      const destinationPlaceField = getByLabelText(strings.toText)
      const dateAndTimeFields = getAllByPlaceholderText('Select Date and Time')
      const seatCountField = getByLabelText(strings.noOfSeatsText)

      const shareBtn = getByText(strings.shareBtnText)

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockRideRequestApi = jest.fn()
      mockRideRequestApi.mockReturnValue(mockLoadingPromise)
      commuteAPI.rideRequest = mockRideRequestApi

      fireEvent.change(sourcePlaceField, { target: { value: sourcePlace } })
      fireEvent.change(destinationPlaceField, {
         target: { value: destinationPlace }
      })
      fireEvent.change(dateAndTimeFields[0], { target: { value: dateAndTime } })
      fireEvent.change(seatCountField, { target: { value: seatCount } })
      fireEvent.click(shareBtn)

      await waitFor(() => expect(shareBtn).toBeDisabled)
   })

   it('should render network failure state', async () => {
      const sourcePlace = 'source-place'
      const destinationPlace = 'test-destinationPlace'
      const dateAndTime = new Date()
      const seatCount = 3

      const mockLoadingPromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})

      const mockRideRequestApi = jest.fn()
      mockRideRequestApi.mockReturnValue(mockLoadingPromise)
      commuteAPI.rideRequest = mockRideRequestApi

      const { getByLabelText, getAllByPlaceholderText, getByText } = render(
         <Router history={createMemoryHistory()}>
            <ShareRideRoute shareStore={shareStore} />
         </Router>
      )
      const sourcePlaceField = getByLabelText(strings.fromText)
      const destinationPlaceField = getByLabelText(strings.toText)
      const dateAndTimeFields = getAllByPlaceholderText('Select Date and Time')
      const seatCountField = getByLabelText(strings.noOfSeatsText)
      const shareBtn = getByText(strings.shareBtnText)

      fireEvent.change(sourcePlaceField, { target: { value: sourcePlace } })
      fireEvent.change(destinationPlaceField, {
         target: { value: destinationPlace }
      })
      fireEvent.change(dateAndTimeFields[0], { target: { value: dateAndTime } })
      fireEvent.change(seatCountField, { target: { value: seatCount } })
      fireEvent.click(shareBtn)

      await waitFor(() => {
         getByText(/Retry/i)
      })
   })
})
