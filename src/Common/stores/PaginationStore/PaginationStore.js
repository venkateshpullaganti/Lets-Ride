import React from 'react'
import { observable, action, computed } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

class PaginationStore {
   @observable apiStatus
   @observable apiError
   @observable entities
   @observable currentPage
   @observable selectedSort
   @observable selectedFilter
   @observable selectedSortOrder

   sortOptions
   filterOptions
   totalEntitiesCount
   totalPages
   limit
   getEntitiesAPI
   model
   entitiesKey
   totalKey
   filterOptionsAccessKey
   sortOptionsAccessKey
   filterKey
   sortOrderKey
   sortByKey

   constructor(config) {
      this.limit = config.limit
      this.model = config.model
      this.getEntitiesAPI = config.getEntitiesAPI || 'results'
      this.entitiesKey = config.entitiesKey
      this.totalKey = config.totalKey || 'total'
      this.currentPage = config.currentPage
      this.filterKey = config.filterKey
      this.filterOptionsAccessKey = config.filterOptionsAccessKey
      this.sortOptionsAccessKey = config.sortOptionsAccessKey
      this.sortOrderKey = config.sortOrderKey || 'sort_value'
      this.sortByKey = config.sortByKey || 'sort_key'

      this.entities = observable(new Map())
      this.apiStatus = API_INITIAL
      this.apiError = null
      this.totalEntitiesCount = 0
      this.selectedFilter = null
      this.selectedSort = null
      this.selectedSortOrder = 'DESC'
      this.totalPages = 1
   }

   @action.bound
   setTotalPages(totalEntitiesCount) {
      this.totalEntitiesCount = totalEntitiesCount
      this.totalPages = Math.ceil(totalEntitiesCount / this.limit)
   }
   @action.bound
   onChangeSort(sortObj) {
      this.selectedSort = sortObj
      this.clearEntitiesAndGetData()
   }

   @action.bound
   onChangeFilter(filterObj) {
      this.selectedFilter = filterObj
      this.clearEntitiesAndGetData()
   }

   @action.bound
   clearEntitiesAndGetData() {
      this.entities.clear()
      this.currentPage = 1
      this.totalPages = 1
      this.getEntities()
   }

   @action.bound
   onChangeSortOrder(sortOrder) {
      this.selectedSortOrder = sortOrder
   }

   convertCamelCaseToUpperCase = str => str.replace('_', ' ').toUpperCase()

   @action.bound
   setApiStatus(status) {
      this.apiStatus = status
   }

   @action.bound
   setApiError(error) {
      this.apiError = error
   }

   @action.bound
   setApiResponse(response) {
      this.setTotalPages(response[this.totalKey])

      const entitiesArray = response[this.entitiesKey].map(
         entity => new this.model(entity)
      )
      this.entities.set(this.currentPage, entitiesArray)

      this.sortOptions = response[this.sortOptionsAccessKey].map(option => {
         return {
            value: option,
            label: this.convertCamelCaseToUpperCase(option)
         }
      })
      this.filterOptions = response[this.filterOptionsAccessKey].map(option => {
         return { value: option, label: option }
      })
   }

   getValue = obj => {
      if (obj !== null) return obj.value
      return ''
   }

   @action.bound
   getEntities() {
      if (!this.entities.get(this.currentPage)) {
         const { filterKey, sortByKey, sortOrderKey } = this

         const otherParams = {
            limit: this.limit,
            offset: this.offset,
            [filterKey]: this.getValue(this.selectedFilter),
            [sortByKey]: this.getValue(this.selectedSort),
            [sortOrderKey]: this.selectedSortOrder || ''
         }
         const apiPromise = this.getEntitiesAPI({}, otherParams)

         return bindPromiseWithOnSuccess(apiPromise)
            .to(this.setApiStatus, this.setApiResponse)
            .catch(this.setApiError)
      }
   }

   @action.bound
   onChangePage = page => {
      this.currentPage = page
      this.getEntities()
   }
   @computed
   get offset() {
      return (this.currentPage - 1) * this.limit
   }

   @computed
   get currentPageEntities() {
      return this.entities.get(this.currentPage)
   }
   @action.bound
   clearStore() {
      this.init()
   }
}
export { PaginationStore }
