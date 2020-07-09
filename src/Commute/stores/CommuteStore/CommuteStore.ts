import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import RideRequestModel from '../models/RideRequestModel/RideRequestModel'
import AssetRequestModel from '../models/AssetRequestModel/AssetRequestModel'
import { AssetMatchingResultsModel } from '../models/AssetMatchingResultsModel'
import { RideMatchingResultsModel } from '../models/RideMatchingResultsModel'
import { OptionsType } from '../../components/types'
import { CommuteService } from '../../services/CommuteService'
import { PaginationStore } from '../../../Common/stores/PaginationStore'
import { QueryParametersObject } from '../types'

class CommuteStore {
   @observable getMatchingResultsAPIStatus!: number
   @observable getMatchingResultsAPIError!: Error | null

   @observable matchingRideRequests!: Array<RideMatchingResultsModel>
   @observable matchingAssetReqests!: Array<AssetMatchingResultsModel>

   @observable totalMatchingRides!: number
   @observable totalMatchingAssets!: number

   filterOptions!: Array<OptionsType>
   sortOptions!: Array<OptionsType>

   commuteAPIService: CommuteService

   rideRequestPaginationStore!: PaginationStore
   assetRequestPaginationStore!: PaginationStore

   constructor(CommuteService: CommuteService) {
      this.commuteAPIService = CommuteService
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
         limit: 4,
         model: RideRequestModel,
         getEntitiesAPI: this.commuteAPIService.myRideRequestsApi,
         totalKey: 'total_rides',
         currentPage: 1,
         entitiesKey: 'rides',
         filterOptionsAccessKey: 'filter_options',
         sortOptionsAccessKey: 'sort_options',
         filterKey: 'status'
      }
      this.rideRequestPaginationStore = new PaginationStore(
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
      this.assetRequestPaginationStore = new PaginationStore(
         assetPaginationConfig
      )
   }

   convertCamelCaseToUpperCase = (str: string) =>
      str.replace('_', ' ').toUpperCase()

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
   getMatchingResults(otherParams: QueryParametersObject) {
      const myMatchingResultsPromise = this.commuteAPIService.matchingResultsApi(
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
