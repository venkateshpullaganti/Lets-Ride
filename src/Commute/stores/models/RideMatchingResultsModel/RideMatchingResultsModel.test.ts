import React from 'react'

import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import { RideMatchingResultsModel } from '.'
import { CommuteService } from '../../../services/CommuteService'

describe('RideMatchingResultsModel tests', () => {
   let rideMatchingResultsModel
   let commuteService
   const rideObj = {
      ride_request_id: 1,
      source: 'Kurnool',
      destination: 'Chittoor',
      travel_date_time: '26/6/2020 10:30 AM',
      flexible_timings: false,
      flexible_from_date_time: '',
      flexible_to_date_time: '',
      seats: 3,
      laguage_quantity: 5,
      username: 'Mukunda 1',
      user_phone_number: 1234567890
   }

   beforeEach(() => {
      commuteService = new CommuteService()
      rideMatchingResultsModel = new RideMatchingResultsModel(
         rideObj,
         commuteService
      )
   })
   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test initialization of rideRequestModel', () => {
      expect(rideMatchingResultsModel.rideRequestApiStatus).toBe(API_INITIAL)
      expect(rideMatchingResultsModel.rideRequestApiError).toBe(null)
   })

   //    it('Should test acceptRideRequestAPI loading status', () => {
   //       const mockLoadingPromise = new Promise(function(resolve, reject) {})
   //       const mockAcceptRideRequest = jest.fn()
   //       mockAcceptRideRequest.mockReturnValue(mockLoadingPromise)
   //       commuteService.acceptRideRequest = mockAcceptRideRequest
   //       rideMatchingResultsModel.acceptRequest()
   //       expect(rideMatchingResultsModel.rideRequestApiStatus).toBe(API_FETCHING)
   //    })

   it('Should test acceptRideRequestAPI success status', async () => {
      const mockSuccessPromise = new Promise(function(resolve) {
         resolve()
      })

      const mockAcceptRideRequest = jest.fn()
      mockAcceptRideRequest.mockReturnValue(mockSuccessPromise)

      commuteService.acceptRideRequest = mockAcceptRideRequest
      await rideMatchingResultsModel.acceptRideRequest()

      expect(rideMatchingResultsModel.rideRequestApiStatus).toBe(API_SUCCESS)
   })

   it('Should test acceptRideRequestAPI failure status', async () => {
      const mockFailurePromise = new Promise(function(_, reject) {
         reject()
      })
      const mockAcceptRideRequest = jest.fn()
      mockAcceptRideRequest.mockReturnValue(mockFailurePromise)
      commuteService.acceptRideRequest = mockAcceptRideRequest
      await rideMatchingResultsModel.acceptRideRequest()
      expect(rideMatchingResultsModel.rideRequestApiStatus).toBe(API_FAILED)
   })
})
