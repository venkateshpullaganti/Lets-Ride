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
import { CommuteAPI } from '../../services/CommuteService/CommuteAPI'

describe('CommuteStore Tests', () => {
   let commuteApi: CommuteService
   let commuteStore: CommuteStore

   beforeEach(() => {
      commuteApi = new CommuteAPI()
      commuteStore = new CommuteStore(commuteApi)
   })
   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test initialising of Commute store', () => {
      expect(commuteStore.getMatchingResultsAPIStatus).toBe(API_INITIAL)
      expect(commuteStore.getMatchingResultsAPIError).toBe(null)
   })

   it('should test MatchingResults fetching state', async () => {
      const paginationObj = {
         limit: 4,
         offset: 0,
         status: '',
         sort_key: '',
         sort_value: ''
      }

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockMatchingResultsApi = jest.fn()
      mockMatchingResultsApi.mockReturnValue(mockLoadingPromise)
      commuteApi.matchingResultsApi = mockMatchingResultsApi

      commuteStore.getMatchingResults(paginationObj)

      await waitFor(() => {
         expect(commuteStore.getMatchingResultsAPIStatus).toBe(API_FETCHING)
      })
   })
   it('should test MatchingResults success state', async () => {
      const paginationObj = {
         limit: 4,
         offset: 0,
         status: '',
         sort_key: '',
         sort_value: ''
      }

      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(matchingResultsFixtures)
      })
      const mockMatchingResultsApi = jest.fn()
      mockMatchingResultsApi.mockReturnValue(mockSuccessPromise)
      commuteApi.matchingResultsApi = mockMatchingResultsApi

      commuteStore.getMatchingResults(paginationObj)

      await waitFor(() => {
         expect(commuteStore.getMatchingResultsAPIStatus).toBe(API_SUCCESS)
      })
   })
   it('should test MatchingResults failure state', async () => {
      const paginationObj = {
         limit: 4,
         offset: 0,
         status: '',
         sort_key: '',
         sort_value: ''
      }

      const mockRejectPromise = new Promise(function(_, reject) {
         reject()
      })
      const mockMatchingResultsApi = jest.fn()
      mockMatchingResultsApi.mockReturnValue(mockRejectPromise)
      commuteApi.matchingResultsApi = mockMatchingResultsApi

      commuteStore.getMatchingResults(paginationObj)

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
