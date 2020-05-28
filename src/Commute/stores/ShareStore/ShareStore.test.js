import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import { CommuteService } from '../../services/CommuteService'

import { ShareStore } from '.'

describe('ShareStore Tests', () => {
   let comuteAPI
   let shareStore

   beforeEach(() => {
      comuteAPI = new CommuteService()
      shareStore = new ShareStore(comuteAPI)
   })

   it('should test initialising share store', () => {
      expect(shareStore.getRideRequestAPIStatus).toBe(API_INITIAL)
      expect(shareStore.getRideRequestAPIError).toBe(null)
   })

   it('should test rideRequest loading state whle sending data', () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      const requestObj = {
         source: 'sourcePlace',
         destination: 'destinationPlace'
      }

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockRideRequestAPI = jest.fn()
      mockRideRequestAPI.mockReturnValue(mockLoadingPromise)
      comuteAPI.rideRequest = shareStore.rideRequest(
         requestObj,
         onSuccess,
         onFailure
      )
      expect(shareStore.getRideRequestAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test the RideRequestAPI success state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      const requestObj = {
         source: 'sourcePlace',
         destination: 'destinationPlace'
      }

      const mockSuccessPromise = Promise.resolve()

      const mockRideRequest = jest.fn()
      mockRideRequest.mockReturnValue(mockSuccessPromise)
      comuteAPI.rideRequest = mockRideRequest

      await shareStore.rideRequest(requestObj, onSuccess, onFailure)
      expect(shareStore.getRideRequestAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
   })

   it('should test rideRequestAPI failure state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const requestObj = {
         source: 'sourcePlace',
         destination: 'destinationPlace'
      }

      jest
         .spyOn(comuteAPI, 'rideRequest')
         .mockImplementation(() => Promise.reject())

      await shareStore.rideRequest(requestObj, onSuccess, onFailure)
      expect(shareStore.getRideRequestAPIStatus).toBe(API_FAILED)
      expect(onFailure).toBeCalled()
   })
})
