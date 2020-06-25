import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import { CommuteService } from '../../services/CommuteService'

import matchingResultsFixtures from '../../fixtures/matchingResultsFixtures.json'
import myAssetRequestsFixtures from '../../fixtures/myAssetRequestsFixtures.json'
import myRideRequestsFixtures from '../../fixtures/myRideRequestsFixtures.json'

import { CommuteStore } from '.'
import { waitFor } from '@testing-library/react'

describe('CommuteStore Tests', () => {
   let commuteApi
   let commuteStore

   beforeEach(() => {
      commuteApi = new CommuteService()
      commuteStore = new CommuteStore(commuteApi)
   })
   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test initialising of Commute store', () => {
      expect(commuteStore.getMyRideRequestsAPIStatus).toBe(API_INITIAL)
      expect(commuteStore.getMyRideRequestsAPIError).toBe(null)

      expect(commuteStore.getMyAssetRequestsAPIStatus).toBe(API_INITIAL)
      expect(commuteStore.getMyAssetRequestsAPIError).toBe(null)

      expect(commuteStore.getMatchingResultsAPIStatus).toBe(API_INITIAL)
      expect(commuteStore.getMatchingResultsAPIError).toBe(null)
   })

   it('should test myRideRequestsApi fetching state', () => {
      const requestObject = {
         source: 'sourcePlace',
         destination: 'destinationPlace'
      }
      const paginationObj = {
         limit: 4,
         offset: 0
      }

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockmyRideRequestsApi = jest.fn()
      mockmyRideRequestsApi.mockReturnValue(mockLoadingPromise)
      commuteApi.myRideRequestsApi = mockmyRideRequestsApi

      commuteStore.getMyRideRequests(requestObject, paginationObj)

      expect(commuteStore.getMyRideRequestsAPIStatus).toBe(API_FETCHING)
   })

   it('should test  myRideRequestsApi success state', async () => {
      const requestObject = {
         source: 'sourcePlace',
         destination: 'destinationPlace'
      }
      const paginationObj = {
         limit: 4,
         offset: 0
      }

      const mockSuccessPromise = new Promise(resolve =>
         resolve(myRideRequestsFixtures)
      )

      const mockRideRequestApi = jest.fn()
      mockRideRequestApi.mockReturnValue(mockSuccessPromise)
      commuteApi.myRideRequestsApi = mockRideRequestApi

      await commuteStore.getMyRideRequests(requestObject, paginationObj)
      expect(commuteStore.getMyRideRequestsAPIStatus).toBe(API_SUCCESS)
      expect(commuteStore.rideRequests.length).not.toBe(0)
   })

   it('should test myRideRequestsApi failure state', async () => {
      const requestObject = {
         source: 'sourcePlace',
         destination: 'destinationPlace'
      }
      const paginationObj = {
         limit: 4,
         offset: 0
      }

      const mockFailurePromise = new Promise((_, reject) => reject())

      const mockRideRequestApi = jest.fn()
      mockRideRequestApi.mockReturnValue(mockFailurePromise)
      commuteApi.myRideRequestsApi = mockRideRequestApi

      // jest
      //    .spyOn(commuteApi, 'myRideRequestsApi')
      //    .mockImplementation(() => Promise.reject())

      await commuteStore.getMyRideRequests(requestObject, paginationObj)
      expect(commuteStore.getMyRideRequestsAPIStatus).toBe(API_FAILED)
   })

   it('should test getMyAssetRequests fetching state', () => {
      const requestObject = {
         source: 'sourcePlace',
         destination: 'destinationPlace'
      }
      const paginationObj = {
         limit: 4,
         offset: 0
      }

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockmyAssetRequestsApi = jest.fn()
      mockmyAssetRequestsApi.mockReturnValue(mockLoadingPromise)
      commuteApi.myAssetsRequestsApi = mockmyAssetRequestsApi

      commuteStore.getMyAssetsRequests(requestObject, paginationObj)

      expect(commuteStore.getMyAssetRequestsAPIStatus).toBe(API_FETCHING)
   })
   it('should test  getMyAssetRequests success state', async () => {
      const requestObject = {
         source: 'sourcePlace',
         destination: 'destinationPlace'
      }
      const paginationObj = {
         limit: 4,
         offset: 0
      }

      const mockSuccessPromise = new Promise(resolve =>
         resolve(myAssetRequestsFixtures)
      )

      const mockAssetRequestApi = jest.fn()
      mockAssetRequestApi.mockReturnValue(mockSuccessPromise)
      commuteApi.myAssetRequestsApi = mockAssetRequestApi

      await commuteStore.getMyAssetsRequests(requestObject, paginationObj)
      expect(commuteStore.getMyAssetRequestsAPIStatus).toBe(API_SUCCESS)
      expect(commuteStore.assetRequests.length).not.toBe(0)
   })
   it('should test getMyAssetRequests failure state', async () => {
      const requestObject = {
         source: 'sourcePlace',
         destination: 'destinationPlace'
      }
      const paginationObj = {
         limit: 4,
         offset: 0
      }

      const mockFailurePromise = new Promise((_, reject) => reject())

      const mockAssetRequestsApi = jest.fn()
      mockAssetRequestsApi.mockReturnValue(mockFailurePromise)
      commuteApi.myAssetRequestsApi = mockAssetRequestsApi

      await commuteStore.getMyAssetsRequests(requestObject, paginationObj)
      expect(commuteStore.getMyAssetRequestsAPIStatus).toBe(API_FAILED)
   })

   it('should test MatchingResults fetching state', async () => {
      const requestObject = {
         source: 'sourcePlace',
         destination: 'destinationPlace'
      }
      const paginationObj = {
         limit: 4,
         offset: 0
      }

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockMatchingResultsApi = jest.fn()
      mockMatchingResultsApi.mockReturnValue(mockLoadingPromise)
      commuteApi.matchingResultsApi = mockMatchingResultsApi

      commuteStore.getMatchingResults(requestObject, paginationObj)

      await waitFor(() => {
         expect(commuteStore.getMatchingResultsAPIStatus).toBe(API_FETCHING)
      })
   })
   it('should test MatchingResults success state', async () => {
      const requestObject = {
         source: 'sourcePlace',
         destination: 'destinationPlace'
      }
      const paginationObj = {
         limit: 4,
         offset: 0
      }

      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(matchingResultsFixtures)
      })
      const mockMatchingResultsApi = jest.fn()
      mockMatchingResultsApi.mockReturnValue(mockSuccessPromise)
      commuteApi.matchingResultsApi = mockMatchingResultsApi

      commuteStore.getMatchingResults(requestObject, paginationObj)

      await waitFor(() => {
         expect(commuteStore.getMatchingResultsAPIStatus).toBe(API_SUCCESS)
      })
   })
   it('should test MatchingResults failure state', async () => {
      const requestObject = {
         source: 'sourcePlace',
         destination: 'destinationPlace'
      }
      const paginationObj = {
         limit: 4,
         offset: 0
      }

      const mockRejectPromise = new Promise(function(_, reject) {
         reject()
      })
      const mockMatchingResultsApi = jest.fn()
      mockMatchingResultsApi.mockReturnValue(mockRejectPromise)
      commuteApi.matchingResultsApi = mockMatchingResultsApi

      commuteStore.getMatchingResults(requestObject, paginationObj)

      await waitFor(() => {
         expect(commuteStore.getMatchingResultsAPIStatus).toBe(API_FAILED)
      })
   })
   it('should test the clearStore()', () => {
      const mockInit = jest.fn()
      commuteStore.init = mockInit
      commuteStore.clearStore()
      expect(mockInit).toBeCalled()
   })
})
