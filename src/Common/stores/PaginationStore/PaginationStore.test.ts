import React from 'react'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'
import { waitFor } from '@testing-library/react'

import paginationStoreTestFixtures from './PaginationStoreTestsData/paginationStoreTestFixtures.json'
import PaginationStoreTestsModel from './PaginationStoreTestsData/PaginationStoreTestsModel'

import { PaginationStore } from '.'

describe('Pagination store tests', () => {
   let paginationStore
   let mockEntitiesFetchingAPI
   let config

   beforeEach(() => {
      mockEntitiesFetchingAPI = jest.fn()
      config = {
         limit: 2,
         model: PaginationStoreTestsModel,
         getEntitiesAPI: mockEntitiesFetchingAPI,
         totalKey: 'total_entities',
         currentPage: 1,
         entitiesKey: 'entities',
         filterOptionsAccessKey: 'filter_options',
         sortOptionsAccessKey: 'sort_options',
         filterKey: 'status'
      }
      paginationStore = new PaginationStore(config)
   })
   afterEach(() => {
      jest.resetAllMocks()
   })
   it('should test test pagination Store initialization', () => {
      expect(paginationStore.apiStatus).toBe(API_INITIAL)
      expect(paginationStore.apiError).toBe(null)
   })
   it('should test fetching state of getEntities', async () => {
      const mockLoadingPromise = new Promise(_ => {})
      mockEntitiesFetchingAPI.mockReturnValue(mockLoadingPromise)
      paginationStore.getEntities()
      await waitFor(() => {
         expect(paginationStore.apiStatus).toBe(API_FETCHING)
      })
   })
   it('should test success state of getEntities', async () => {
      const mockSuccessPromise = new Promise((resolve, reject) =>
         resolve(paginationStoreTestFixtures)
      )
      mockEntitiesFetchingAPI.mockReturnValue(mockSuccessPromise)

      paginationStore.getEntities()
      await waitFor(() => {
         expect(paginationStore.apiStatus).toBe(API_SUCCESS)
      })
   })
   it('should test failure state of getEntities', async () => {
      const mockSuccessPromise = new Promise((_, reject) =>
         reject(paginationStoreTestFixtures)
      )
      mockEntitiesFetchingAPI.mockReturnValue(mockSuccessPromise)

      paginationStore.getEntities()
      await waitFor(() => {
         expect(paginationStore.apiStatus).toBe(API_FAILED)
      })
   })
   it('should trigger the network call on page change', async () => {
      const mockLoadingPromise = new Promise(_ => {})
      mockEntitiesFetchingAPI.mockReturnValue(mockLoadingPromise)

      paginationStore.onChangePage(2)
      await waitFor(() => {
         expect(mockEntitiesFetchingAPI).toBeCalled()
         expect(paginationStore.currentPage).toBe(2)
         expect(paginationStore.apiStatus).toBe(API_FETCHING)
      })
   })
   it('should trigger the network call on change filter', async () => {
      const mockLoadingPromise = new Promise(_ => {})
      mockEntitiesFetchingAPI.mockReturnValue(mockLoadingPromise)

      paginationStore.onChangeFilter({ value: 'FILTER1', label: 'FILTER1' })
      await waitFor(() => {
         expect(mockEntitiesFetchingAPI).toBeCalled()
         expect(paginationStore.apiStatus).toBe(API_FETCHING)
      })
   })
   it('should trigger the network call on change sort', async () => {
      const mockLoadingPromise = new Promise(_ => {})
      mockEntitiesFetchingAPI.mockReturnValue(mockLoadingPromise)

      paginationStore.onChangeSort({
         value: 'sortOption1',
         label: 'sortOption1'
      })
      await waitFor(() => {
         expect(mockEntitiesFetchingAPI).toBeCalled()
         expect(paginationStore.apiStatus).toBe(API_FETCHING)
      })
   })
   it('should set the entities data, filter options and sort option on successful network call', async () => {
      const expectedSortOptions = [
         { value: 'sortOption1', label: 'SORTOPTION1' },
         { value: 'sortOption2', label: 'SORTOPTION2' }
      ]
      const expectedFilterOptions = [
         { value: 'FILTER1', label: 'FILTER1' },
         { value: 'FILTER2', label: 'FILTER2' },
         { value: 'FILTER3', label: 'FILTER3' }
      ]

      const mockSuccessPromise = new Promise(resolve =>
         resolve(paginationStoreTestFixtures)
      )
      mockEntitiesFetchingAPI.mockReturnValue(mockSuccessPromise)

      paginationStore.getEntities()

      await waitFor(() => {
         expect(mockEntitiesFetchingAPI).toBeCalled()
         expect(paginationStore.apiStatus).toBe(API_SUCCESS)
         expect(paginationStore.currentPageEntities.length).not.toBe(0)
         expect(paginationStore.sortOptions).toStrictEqual(expectedSortOptions)
         expect(paginationStore.filterOptions).toStrictEqual(
            expectedFilterOptions
         )
      })
   })
   //TODO: write testcase for clearing store
})
