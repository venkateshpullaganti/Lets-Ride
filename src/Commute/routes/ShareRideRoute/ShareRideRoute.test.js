import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'

import { createMemoryHistory } from 'history'

import strings from '../../i18n/strings.json'

import { CommuteService } from '../../services/CommuteService'

import { ShareStore } from '../../stores/ShareStore'

import { ShareRideRoute } from '.'

describe('ShareRideRoute Tests', () => {
   let commuteAPI
   let shareStore

   beforeEach(() => {
      commuteAPI = new CommuteService()
      shareStore = new ShareStore(commuteAPI)
   })
   afterEach(() => {
      jest.resetAllMocks()
   })

   it('Should render sourcePlace empty error message', () => {
      const { getByText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <ShareRideRoute shareStore={shareStore} />
         </Router>
      )
      const shareBtn = getByRole('button', { name: strings.shareBtnText })
      fireEvent.click(shareBtn)
      getByText(strings.sourcePlaceError)
   })

   it('should render destination place empty error message', () => {
      const sourcePlace = 'krnl'
      const { getByText, getByRole, getByLabelText } = render(
         <Router history={createMemoryHistory()}>
            <ShareRideRoute shareStore={shareStore} />
         </Router>
      )
      const sourcePlaceField = getByLabelText(strings.fromText)
      const shareBtn = getByRole('button', { name: strings.shareBtnText })

      fireEvent.change(sourcePlaceField, { target: { value: sourcePlace } })
      fireEvent.click(shareBtn)
      getByText(strings.destinationPlaceError)
   })

   it('should render loading state', () => {
      const sourcePlace = 'sourceplace'
      const destinationPlace = 'test-destinationPlace'
      const { getByLabelText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <ShareRideRoute shareStore={shareStore} />
         </Router>
      )
      const sourcePlaceField = getByLabelText(strings.fromText)
      const destinationPlaceField = getByLabelText(strings.toText)
      const shareBtn = getByRole('button', { name: strings.shareBtnText })

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockRideRequestApi = jest.fn()
      mockRideRequestApi.mockReturnValue(mockLoadingPromise)
      commuteAPI.rideRequest = mockRideRequestApi

      fireEvent.change(sourcePlaceField, { target: { value: sourcePlace } })
      fireEvent.change(destinationPlaceField, {
         target: { value: destinationPlace }
      })
      fireEvent.click(shareBtn)

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
   //          <ShareRideRoute shareStore={shareStore} />
   //       </Router>
   //    )
   //    const sourcePlaceField = getByLabelText(strings.fromText)
   //    const destinationPlaceField = getByLabelText(strings.toText)
   //    const shareBtn = getByRole('button', { name: strings.shareBtnText })

   //    fireEvent.change(sourcePlaceField, { target: { value: sourcePlace } })
   //    fireEvent.change(destinationPlaceField, { target: { value: destinationPlace } })
   //    fireEvent.click(shareBtn)

   //    waitFor(() => {
   //       getByText(/NETWORK_ERROR/i)
   //    })
   // })
})
