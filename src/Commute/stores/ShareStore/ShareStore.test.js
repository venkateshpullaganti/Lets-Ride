import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import { CommuteService } from '../../services/CommuteService'

import { ShareStore } from '.'
import { waitFor } from '@testing-library/react'

describe('ShareStore Tests', () => {
   let comuteAPI
   let shareStore

   beforeEach(() => {
      comuteAPI = new CommuteService()
      shareStore = new ShareStore(comuteAPI)
   })
   afterEach(() => jest.resetAllMocks())

   it('should test initialising share store', () => {
      expect(shareStore.getTravelInfoAPIStatus).toBe(API_INITIAL)
      expect(shareStore.getRideShareAPIError).toBe(null)

      expect(shareStore.getRideShareAPIStatus).toBe(API_INITIAL)
      expect(shareStore.getTravelInfoAPIError).toBe(null)
   })

   it('should test rideShareApi loading state while sending data', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      const requestObj = {
         source: 'sourcePlace',
         destination: 'destinationPlace'
      }

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockRideRequestAPI = jest.fn()
      mockRideRequestAPI.mockReturnValue(mockLoadingPromise)
      comuteAPI.rideShare = shareStore.rideShare(
         requestObj,
         onSuccess,
         onFailure
      )
      await waitFor(() => {
         expect(shareStore.getRideShareAPIStatus).toBe(API_FETCHING)
         expect(onSuccess).not.toBeCalled()
         expect(onFailure).not.toBeCalled()
      })
   })

   it('should test the rideShareApi success state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      const requestObj = {
         source: 'sourcePlace',
         destination: 'destinationPlace'
      }

      const mockSuccessPromise = Promise.resolve()

      const mockRideRequest = jest.fn()
      mockRideRequest.mockReturnValue(mockSuccessPromise)
      comuteAPI.rideShare = mockRideRequest

      await shareStore.rideShare(requestObj, onSuccess, onFailure)
      expect(shareStore.getRideShareAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
   })

   it('should test rideShareAPI failure state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const requestObj = {
         source: 'sourcePlace',
         destination: 'destinationPlace'
      }

      jest
         .spyOn(comuteAPI, 'rideShare')
         .mockImplementation(() => Promise.reject())

      await shareStore.rideShare(requestObj, onSuccess, onFailure)
      expect(shareStore.getRideShareAPIStatus).toBe(API_FAILED)
      expect(onFailure).toBeCalled()
   })

   it('should test travelInfoAPI loading state while sending data', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      const requestObj = {
         source: 'sourcePlace',
         destination: 'destinationPlace'
      }

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockTravelInfoApi = jest.fn()
      mockTravelInfoApi.mockReturnValue(mockLoadingPromise)
      comuteAPI.shareTravelInfoApi = mockTravelInfoApi

      shareStore.shareTravelInfo(requestObj, onSuccess, onFailure)
      await waitFor(() => {
         expect(shareStore.getTravelInfoAPIStatus).toBe(API_FETCHING)
         expect(onSuccess).not.toBeCalled()
         expect(onFailure).not.toBeCalled()
      })
   })

   it('should test the travelInfoAPI success state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      const requestObj = {
         source: 'sourcePlace',
         destination: 'destinationPlace'
      }

      const mockSuccessPromise = new Promise(resolve => resolve())

      const mockshareTravelInfoApi = jest.fn()
      mockshareTravelInfoApi.mockReturnValue(mockSuccessPromise)
      comuteAPI.shareTravelInfoApi = mockshareTravelInfoApi

      await shareStore.shareTravelInfo(requestObj, onSuccess, onFailure)
      expect(shareStore.getTravelInfoAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
   })

   it('should test travelInfoAPI failure state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const requestObj = {
         source: 'sourcePlace',
         destination: 'destinationPlace'
      }

      jest
         .spyOn(comuteAPI, 'shareTravelInfoApi')
         .mockImplementation(() => Promise.reject())

      await shareStore.shareTravelInfo(requestObj, onSuccess, onFailure)
      expect(shareStore.getTravelInfoAPIStatus).toBe(API_FAILED)
      expect(onFailure).toBeCalled()
   })
})
