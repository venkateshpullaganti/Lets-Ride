import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import { CommuteService } from '../../services/CommuteService'

import { RequestStore } from '.'
import { waitFor } from '@testing-library/react'

describe('RequestStore Tests', () => {
   let comuteAPI
   let requestStore

   beforeEach(() => {
      comuteAPI = new CommuteService()
      requestStore = new RequestStore(comuteAPI)
   })

   it('should test initialising request store', () => {
      expect(requestStore.getRideRequestAPIStatus).toBe(API_INITIAL)
      expect(requestStore.getRideRequestAPIError).toBe(null)
   })

   it('should test rideRequest loading state whle sending data', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      const requestObject = {
         source: 'sourcePlace',
         destination: 'destinationPlace'
      }

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockRideRequestAPI = jest.fn()
      mockRideRequestAPI.mockReturnValue(mockLoadingPromise)
      comuteAPI.rideRequest = requestStore.rideRequest(
         requestObject,
         onSuccess,
         onFailure
      )
      await waitFor(() => {
         expect(requestStore.getRideRequestAPIStatus).toBe(API_FETCHING)
         expect(onSuccess).not.toBeCalled()
         expect(onFailure).not.toBeCalled()
      })
   })

   it('should test the RideRequestAPI success state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      const requestObject = {
         source: 'sourcePlace',
         destination: 'destinationPlace'
      }

      const mockSuccessPromise = Promise.resolve()

      const mockRideRequest = jest.fn()
      mockRideRequest.mockReturnValue(mockSuccessPromise)
      comuteAPI.rideRequest = mockRideRequest

      await requestStore.rideRequest(requestObject, onSuccess, onFailure)
      expect(requestStore.getRideRequestAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
   })

   it('should test rideRequestAPI failure state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const requestObject = {
         source: 'sourcePlace',
         destination: 'destinationPlace'
      }

      jest
         .spyOn(comuteAPI, 'rideRequest')
         .mockImplementation(() => Promise.reject())

      await requestStore.rideRequest(requestObject, onSuccess, onFailure)
      expect(requestStore.getRideRequestAPIStatus).toBe(API_FAILED)
      expect(onFailure).toBeCalled()
   })
})
