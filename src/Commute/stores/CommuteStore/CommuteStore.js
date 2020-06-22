import React from 'react'
import { observable, action, computed } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { PaginationStore } from '../../../Common/stores/PaginationStore'

import RideRequestModel from '../models/RideRequestModel'
import AssetRequestModel from '../models/AssetRequestModel'
import { AssetMatchingResultsModel } from '../models/AssetMatchingResultsModel'
import { RideMatchingResultsModel } from '../models/RideMatchingResultsModel'

class CommuteStore {
   @observable getMatchingResultsAPIStatus
   @observable getMatchingResultsAPIError

   @observable matchingRideRequests
   @observable matchingAssetReqests

   @observable totalMatchingRides
   @observable totalMatchingAssets

   filterOptions
   sortOptions

   commuteAPIService
   PaginationStore

   rideRequestPaginationStore
   assetRequestPaginationStore

   constructor(CommuteService) {
      this.commuteAPIService = CommuteService
      this.PaginationStore = PaginationStore
      this.init()
   }

   @action.bound
   init() {
      this.getMatchingResultsAPIStatus = API_INITIAL
      this.getMatchingResultsAPIError = null
      this.matchingRideRequests = []
      this.matchingAssetReqests = []
      this.totalMatchingRides = 0
      this.totalMatchingAssets = 0

      const ridePaginationConfig = {
         limit: 2,
         model: RideRequestModel,
         getEntitiesAPI: this.commuteAPIService.myRideRequestsApi,
         totalKey: 'total_rides',
         currentPage: 1,
         entitiesKey: 'rides',
         filterOptionsAccessKey: 'filter_options',
         sortOptionsAccessKey: 'sort_options',
         filterKey: 'status'
      }
      this.rideRequestPaginationStore = new this.PaginationStore(
         ridePaginationConfig
      )
      const assetPaginationConfig = {
         limit: 6,
         model: AssetRequestModel,
         getEntitiesAPI: this.commuteAPIService.myAssetRequestsApi,
         totalKey: 'total_assets',
         currentPage: 1,
         entitiesKey: 'assets',
         filterOptionsAccessKey: 'filter_options',
         sortOptionsAccessKey: 'sort_options',
         filterKey: 'status'
      }
      this.assetRequestPaginationStore = new this.PaginationStore(
         assetPaginationConfig
      )
   }

   convertCamelCaseToUpperCase = str => str.replace('_', ' ').toUpperCase()

   @action.bound
   setMatchingResultsAPIStatus(status) {
      this.getMatchingResultsAPIStatus = status
   }

   @action.bound
   setMatchingResultsAPIError(error) {
      this.getMatchingResultsAPIError = error
   }

   @action.bound
   setMatchingResultsAPIResponse(response) {
      const commuteAPIService = this.commuteAPIService
      this.totalMatchingAssets = response.total_assets
      this.totalMatchingRides = response.total_rides

      this.matchingRideRequests = response.rides.map(ride => {
         return new RideMatchingResultsModel(ride, commuteAPIService)
      })
      this.matchingAssetReqests = response.assets.map(asset => {
         return new AssetMatchingResultsModel(asset, commuteAPIService)
      })
   }

   @action
   getMatchingResults(requestObject, otherParams) {
      const myMatchingResultsPromise = this.commuteAPIService.matchingResultsApi(
         requestObject,
         otherParams
      )
      return bindPromiseWithOnSuccess(myMatchingResultsPromise)
         .to(
            this.setMatchingResultsAPIStatus,
            this.setMatchingResultsAPIResponse
         )
         .catch(this.setMatchingResultsAPIError)
   }

   @action.bound
   clearStore() {
      this.init()
   }
}
export { CommuteStore }
