import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'

import { createMemoryHistory } from 'history'

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
      const { getByText, getByLabelText } = render(
         <Router history={createMemoryHistory()}>
            <RideRequestRoute requestStore={requestStore} />
         </Router>
      )
      const sourcePlaceField = getByLabelText(strings.fromText)
      const requestBtn = getByText('REQUEST')

      fireEvent.change(sourcePlaceField, { target: { value: sourcePlace } })
      fireEvent.click(requestBtn)
      getByText(strings.destinationPlaceError)
   })

   it('should render travelDate empty error message', () => {
      const sourcePlace = 'krnl'
      const destinationPlace = 'test-destinationPlace'
      const { getByText, getByLabelText } = render(
         <Router history={createMemoryHistory()}>
            <RideRequestRoute requestStore={requestStore} />
         </Router>
      )
      const sourcePlaceField = getByLabelText(strings.fromText)
      const destinationPlaceField = getByLabelText(strings.toText)
      const requestBtn = getByText('REQUEST')

      fireEvent.change(sourcePlaceField, { target: { value: sourcePlace } })
      fireEvent.change(destinationPlaceField, {
         target: { value: destinationPlace }
      })
      fireEvent.click(requestBtn)
      getByText('Required')
   })
   it('should render error message on zero seatCount  ', () => {
      const sourcePlace = 'krnl'
      const destinationPlace = 'test-destinationPlace'
      const dateAndTime = new Date()

      const { getByText, getByLabelText, getAllByPlaceholderText } = render(
         <Router history={createMemoryHistory()}>
            <RideRequestRoute requestStore={requestStore} />
         </Router>
      )
      const sourcePlaceField = getByLabelText(strings.fromText)
      const destinationPlaceField = getByLabelText(strings.toText)
      const dateAndTimeFields = getAllByPlaceholderText('Select Date and Time')
      const requestBtn = getByText('REQUEST')

      fireEvent.change(sourcePlaceField, { target: { value: sourcePlace } })
      fireEvent.change(destinationPlaceField, {
         target: { value: destinationPlace }
      })
      fireEvent.change(dateAndTimeFields[0], { target: { value: dateAndTime } })
      fireEvent.click(requestBtn)
      getByText('Required Seats')
   })

   it('should render loading state', async () => {
      const sourcePlace = 'sourceplace'
      const destinationPlace = 'test-destinationPlace'
      const dateAndTime = new Date()
      const seatCount = 3
      const { getByLabelText, getByText, getAllByPlaceholderText } = render(
         <Router history={createMemoryHistory()}>
            <RideRequestRoute requestStore={requestStore} />
         </Router>
      )
      const sourcePlaceField = getByLabelText(strings.fromText)
      const destinationPlaceField = getByLabelText(strings.toText)
      const dateAndTimeFields = getAllByPlaceholderText('Select Date and Time')
      const seatCountField = getByLabelText(strings.noOfSeatsText)

      const requestBtn = getByText('REQUEST')

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
      fireEvent.click(requestBtn)

      await waitFor(() => expect(requestBtn).toBeDisabled)
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
            <RideRequestRoute requestStore={requestStore} />
         </Router>
      )
      const sourcePlaceField = getByLabelText(strings.fromText)
      const destinationPlaceField = getByLabelText(strings.toText)
      const dateAndTimeFields = getAllByPlaceholderText('Select Date and Time')
      const seatCountField = getByLabelText(strings.noOfSeatsText)
      const requestBtn = getByText('REQUEST')

      fireEvent.change(sourcePlaceField, { target: { value: sourcePlace } })
      fireEvent.change(destinationPlaceField, {
         target: { value: destinationPlace }
      })
      fireEvent.change(dateAndTimeFields[0], { target: { value: dateAndTime } })
      fireEvent.change(seatCountField, { target: { value: seatCount } })
      fireEvent.click(requestBtn)

      await waitFor(() => {
         getByText(/Retry/i)
      })
   })
})
