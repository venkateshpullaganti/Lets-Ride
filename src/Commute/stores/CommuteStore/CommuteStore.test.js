import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import { CommuteService } from '../../services/CommuteService'

import matchingResultsFixtures from '../../fixtures/matchingResultsFixtures.json'

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
      expect(commuteStore.getMatchingResultsAPIStatus).toBe(API_INITIAL)
      expect(commuteStore.getMatchingResultsAPIError).toBe(null)
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
