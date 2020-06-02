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

   it('should test initialising share store', () => {
      expect(shareStore.getTravelInfoAPIStatus).toBe(API_INITIAL)
      expect(shareStore.getRideShareAPIError).toBe(null)
   })

   it('should test rideShare loading state whle sending data', async () => {
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

   it('should test travelInfo loading state whle sending data', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      const requestObj = {
         source: 'sourcePlace',
         destination: 'destinationPlace'
      }

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockTravelInfoApi = jest.fn()
      mockTravelInfoApi.mockReturnValue(mockLoadingPromise)
      comuteAPI.travelInfo = shareStore.travelInfo(
         requestObj,
         onSuccess,
         onFailure
      )
      await waitFor(() => {
         expect(shareStore.getTravelInfoAPIStatus).toBe(API_FETCHING)
         expect(onSuccess).not.toBeCalled()
         expect(onFailure).not.toBeCalled()
      })
   })

   it('should test the TravelInfoApi success state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      const requestObj = {
         source: 'sourcePlace',
         destination: 'destinationPlace'
      }

      const mockSuccessPromise = Promise.resolve()

      const mockRideRequest = jest.fn()
      mockRideRequest.mockReturnValue(mockSuccessPromise)
      comuteAPI.travelInfo = mockRideRequest

      await shareStore.travelInfo(requestObj, onSuccess, onFailure)
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
         .spyOn(comuteAPI, 'travelInfo')
         .mockImplementation(() => Promise.reject())

      await shareStore.travelInfo(requestObj, onSuccess, onFailure)
      expect(shareStore.getTravelInfoAPIStatus).toBe(API_FAILED)
      expect(onFailure).toBeCalled()
   })
})
