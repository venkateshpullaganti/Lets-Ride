import React from 'react'
import { observable, action, computed } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

export type OptionType = {
   label: string
   value: string
}

export type OptionsType = Array<OptionType>

export type PaginationStoreProps = {
   limit: number
   model: any
   getEntitiesAPI: (params: any) => any
   totalKey: string
   currentPage: number
   entitiesKey: string
   filterOptionsAccessKey: string
   sortOptionsAccessKey: string
   filterKey: string
   sortOrderKey?: string
   sortByKey?: string
   totalPages?: number
}

class PaginationStore {
   @observable apiStatus!: number
   @observable apiError!: Error | null
   @observable entities!: Map<any, any>
   @observable currentPage!: number
   @observable selectedSort!: OptionType | null
   @observable selectedFilter!: OptionType | null
   @observable selectedSortOrder!: string

   sortOptions!: OptionsType
   filterOptions!: OptionsType
   totalEntitiesCount!: number
   totalPages: number
   limit: number
   getEntitiesAPI: any
   model: any
   entitiesKey: string
   totalKey: string
   filterOptionsAccessKey: string
   sortOptionsAccessKey: string
   filterKey: string
   sortOrderKey: string
   sortByKey: string

   constructor(config: PaginationStoreProps) {
      this.limit = config.limit
      this.model = config.model
      this.getEntitiesAPI = config.getEntitiesAPI
      this.entitiesKey = config.entitiesKey
      this.totalKey = config.totalKey || 'total'
      this.currentPage = config.currentPage
      this.totalPages = config.totalPages || 1
      this.filterKey = config.filterKey
      this.filterOptionsAccessKey = config.filterOptionsAccessKey
      this.sortOptionsAccessKey = config.sortOptionsAccessKey
      this.sortOrderKey = config.sortOrderKey || 'sort_value'
      this.sortByKey = config.sortByKey || 'sort_key'

      this.init()
   }
   @action.bound
   init() {
      this.entities = observable(new Map())
      this.apiStatus = API_INITIAL
      this.apiError = null
      this.totalEntitiesCount = 0
      this.selectedFilter = null
      this.selectedSort = null
      this.selectedSortOrder = 'DESC'
   }

   @action.bound
   setTotalPages(totalEntitiesCount: number) {
      this.totalEntitiesCount = totalEntitiesCount
      this.totalPages = Math.ceil(totalEntitiesCount / this.limit)
   }
   @action.bound
   onChangeSort(sortObj: OptionType) {
      this.selectedSort = sortObj
      this.clearEntitiesAndGetData()
   }

   @action.bound
   onChangeFilter(filterObj: OptionType) {
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
   onChangeSortOrder(sortOrder: string) {
      this.selectedSortOrder = sortOrder
   }

   convertCamelCaseToUpperCase = (str: string): string =>
      str.replace('_', ' ').toUpperCase()

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

   getValue = (obj: OptionType | null): string => {
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
         const apiPromise = this.getEntitiesAPI(otherParams)

         return bindPromiseWithOnSuccess(apiPromise)
            .to(this.setApiStatus, this.setApiResponse)
            .catch(this.setApiError)
      }
   }

   @action.bound
   onChangePage = (page: number) => {
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
