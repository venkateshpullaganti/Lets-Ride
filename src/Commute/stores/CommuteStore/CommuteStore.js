import React from 'react'
import { observable, action, computed } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import RideRequestModel from '../models/RideRequestModel'
import AssetRequestModel from '../models/AssetRequestModel'

class CommuteStore {
   @observable getMyAssetRequestsAPIStatus
   @observable getMyAssetRequestsAPIError

   @observable myAssetRequests
   @observable totalMyAssetRequests
   myRideRequestsSortOptions
   myRideRequestsFilterOptions

   @observable getMyRideRequestsAPIStatus
   @observable getMyRideRequestsAPIError

   @observable myRideRequests
   @observable totalMyRideRequests

   myAssetRequestsSortOptions
   myAssetRequestsFilterOptions

   commuteAPIService

   constructor(CommuteService) {
      this.commuteAPIService = CommuteService
      this.init()
   }

   @action.bound
   init() {
      this.getMyRideRequestsAPIStatus = API_INITIAL
      this.getMyRideRequestsAPIError = null
      this.getMyAssetRequestsAPIStatus = API_INITIAL
      this.getMyAssetRequestsAPIError = null
      this.myRideRequests = []
      this.myAssetRequests = []
      this.myRideRequestsSortOptions = []
      this.myRideRequestsFilterOptions = []
      this.myAssetRequestsSortOptions = []
      this.myAssetRequestsFilterOptions = []
   }

   @action
   setGetMyAssetRequestsAPIResponse = response => {
      if (response !== undefined) {
         this.totalMyAssetRequests = response.total_assets
         this.myAssetRequestsSortOptions = response.sort_options.map(option => {
            return {
               value: option,
               label: this.convertCamelCaseToUpperCase(option)
            }
         })

         this.myAssetRequestsFilterOptions = response.filter_options.map(
            option => {
               return { value: option, label: option }
            }
         )
         this.myAssetRequests = response.assets.map(eachRide => {
            return new AssetRequestModel(eachRide)
         })
         console.log(
            'filter',
            this.myAssetRequestsFilterOptions,
            this.myAssetRequestsSortOptions
         )
      }
   }

   @action
   setGetMyAssetRequestsAPIStatus = status => {
      this.getMyAssetRequestsAPIStatus = status
   }

   @action
   setGetMyAssetRequestsAPIError = error => {
      this.getMyAssetRequestsAPIError = error
   }

   @action
   getMyAssetsRequests(requestObject, paginationObj) {
      const myAssetRequestsPromise = this.commuteAPIService.myAssetRequestsApi(
         requestObject,
         paginationObj
      )

      return bindPromiseWithOnSuccess(myAssetRequestsPromise)
         .to(
            this.setGetMyAssetRequestsAPIStatus,
            this.setGetMyAssetRequestsAPIResponse
         )
         .catch(this.setGetMyAssetRequestsAPIError)
   }

   @action
   setGetRideRequestsAPIResponse = response => {
      if (response !== undefined) {
         this.totalMyRideRequests = response.total_rides

         this.myRideRequestsSortOptions = response.sort_options.map(option => {
            return {
               value: option,
               label: this.convertCamelCaseToUpperCase(option)
            }
         })

         this.myRideRequestsFilterOptions = response.filter_options.map(
            option => {
               return { value: option, label: option }
            }
         )

         this.myRideRequests = response.rides.map(eachRide => {
            return new RideRequestModel(eachRide)
         })
      }
   }

   @action
   setGetMyRideRequestsAPIStatus = status => {
      this.getMyRideRequestsAPIStatus = status
   }

   @action
   setGetMyRideRequestsAPIError = error => {
      this.getMyRideRequestsAPIError = error
   }

   convertCamelCaseToUpperCase = str => str.replace('_', ' ').toUpperCase()
   @action
   getMyRideRequests(requestObject, paginationObj) {
      const myRideRequestsPromise = this.commuteAPIService.myRideRequestsApi(
         requestObject,
         paginationObj
      )

      return bindPromiseWithOnSuccess(myRideRequestsPromise)
         .to(
            this.setGetMyRideRequestsAPIStatus,
            this.setGetRideRequestsAPIResponse
         )
         .catch(this.setGetMyRideRequestsAPIError)
   }

   @computed
   get assetRequests() {
      return this.myAssetRequests
   }
   @computed
   get rideRequests() {
      return this.myRideRequests
   }

   @action.bound
   clearStore() {
      this.init()
   }
}
export { CommuteStore }
