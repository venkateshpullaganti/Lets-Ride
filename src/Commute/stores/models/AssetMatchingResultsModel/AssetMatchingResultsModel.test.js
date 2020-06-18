import React from 'react'

import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import { AssetMatchingResultsModel } from '.'
import { CommuteService } from '../../../services/CommuteService'

describe('AssetMatchingResultsModel tests', () => {
   let assetMatchingResultsModel
   let commuteService
   const assetObj = {
      asset_request_id: '456',
      source: 'sourcePlace1',
      destination: 'destinationPlace',
      flexible_timings: false,
      travel_date_time: '2020-05-12 12:30 PM',
      flexible_from_date_time: '',
      flexible_to_date_time: '',
      asset_type: 'LAPTOP',
      asset_sensitivity: 'HIGH',
      asset_quantity: 10,
      asset_type_others: '',
      status: 'ACCEPTED',
      accepted_person: 'mukunda',
      accepted_person_phone_number: '1234567890',
      deliver_to: 'ganesh',
      phone_number: '123456789'
   }

   beforeEach(() => {
      commuteService = new CommuteService()
      assetMatchingResultsModel = new AssetMatchingResultsModel(
         assetObj,
         commuteService
      )
   })
   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test initialization of assetRequestModel', () => {
      expect(assetMatchingResultsModel.assetRequestApiStatus).toBe(API_INITIAL)
      expect(assetMatchingResultsModel.assetRequestApiError).toBe(null)
   })

   it('Should test acceptRideRequestAPI loading status', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockAcceptAssetRequest = jest.fn()
      mockAcceptAssetRequest.mockReturnValue(mockLoadingPromise)
      commuteService.acceptAssetTransportRequest = mockAcceptAssetRequest
      assetMatchingResultsModel.acceptRequest()
      expect(assetMatchingResultsModel.assetRequestApiStatus).toBe(API_FETCHING)
   })

   it('Should test acceptRideRequestAPI success status', async () => {
      const mockSuccessPromise = new Promise(function(resolve) {
         resolve()
      })

      const mockAcceptAssetRequest = jest.fn()
      mockAcceptAssetRequest.mockReturnValue(mockSuccessPromise)

      commuteService.acceptAssetTransportRequest = mockAcceptAssetRequest
      await assetMatchingResultsModel.acceptAssetRequest()

      expect(assetMatchingResultsModel.assetRequestApiStatus).toBe(API_SUCCESS)
   })

   it('Should test acceptRideRequestAPI failure status', async () => {
      const mockFailurePromise = new Promise(function(_, reject) {
         reject()
      })
      const mockAcceptAssetRequest = jest.fn()
      mockAcceptAssetRequest.mockReturnValue(mockFailurePromise)
      commuteService.acceptAssetTransportRequest = mockAcceptAssetRequest
      await assetMatchingResultsModel.acceptAssetRequest()
      expect(assetMatchingResultsModel.assetRequestApiStatus).toBe(API_FAILED)
   })
})
