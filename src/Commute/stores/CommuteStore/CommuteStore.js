import React from 'react'
import uuid from 'react-uuid'

import { observable, action, computed } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import RideRequestModel from '../models/RideRequestModel'
import AssetRequestModel from '../models/AssetRequestModel'

class CommuteStore {
   @observable getMyRequestsAPIStatus
   @observable getMyRequestsAPIError

   @observable getMyAssetRequestsAPIStatus
   @observable getMyAssetRequestsAPIError

   @observable getMyRideRequestsAPIStatus
   @observable getMyRideRequestsAPIError

   @observable myRideRequests
   @observable totalMyRideRequests

   @observable myAssetRequests
   @observable totalMyAssetRequests

   commuteAPIService

   constructor(CommuteService) {
      this.commuteAPIService = CommuteService
      this.init()
   }

   @action.bound
   init() {
      this.getMyRequestsAPIStatus = API_INITIAL
      this.getMyRequestsAPIError = null
      this.myRideRequests = []
      this.myAssetRequests = []
   }

   @action.bound
   setRequestsAPIResponse(response) {
      this.totalMyRideRequests = response.total_rides
      this.totalMyAssetRequests = response.total_assets
      this.myRideRequests = response.rides.map(eachRide => {
         return new RideRequestModel({ ...eachRide, id: uuid().toString() })
      })

      this.myAssetRequests = response.assets.map(eachRide => {
         return new AssetRequestModel({ ...eachRide, id: uuid().toString() })
      })
   }

   @action.bound
   setGetMyRequestsAPIError(APIError) {
      this.getMyRequestsAPIError = APIError
   }

   @action.bound
   setGetMyRequestsAPIStatus(APIStatus) {
      this.getMyRequestsAPIStatus = APIStatus
   }

   @action.bound
   myRequests(requestObject, onSuccess, onFailure) {
      const myRequestsPromise = this.commuteAPIService.myRequests(requestObject)

      return bindPromiseWithOnSuccess(myRequestsPromise)
         .to(this.setGetMyRequestsAPIStatus, response => {
            this.setRequestsAPIResponse(response)
            onSuccess()
         })
         .catch(APIError => {
            this.setGetMyRequestsAPIError(APIError)
            onFailure(APIError)
         })
   }

   setGetMyAssetRequestsAPIResponse = () => {}
   setGetMyAssetRequestsAPIStatus = status => {
      this.getMyAssetRequestsAPIStatus = status
   }
   setGetMyAssetRequestsAPIError = error => {
      this.getMyAssetRequestsAPIError = error
   }

   myAssetsRequests(requestObject, onSuccess, onFailure, paginationObj) {
      const myAssetRequestsPromise = this.commuteAPIService.myAssetsRequestsApi(
         requestObject,
         paginationObj
      )

      return bindPromiseWithOnSuccess(myAssetRequestsPromise)
         .to(this.setGetMyAssetRequestsAPIStatus, response => {
            this.setGetMyAssetRequestsAPIResponse(response)
            onSuccess()
         })
         .catch(APIError => {
            this.setGetMyAssetRequestsAPIError(APIError)
            onFailure(APIError)
         })
   }

   setGetRideRequestsAPIResponse = () => {}

   setGetMyRideRequestsAPIStatus = status => {
      this.getMyRideRequestsAPIStatus = status
   }
   setGetMyRideRequestsAPIError = error => {
      this.getMyRideRequestsAPIError = error
   }

   myRideRequests(requestObject, onSuccess, onFailure, paginationObj) {
      const myRideRequestsPromise = this.commuteAPIService.myRideRequestsApi(
         requestObject,
         paginationObj
      )

      return bindPromiseWithOnSuccess(myRideRequestsPromise)
         .to(this.setGetMyRideRequestsAPIStatus, response => {
            this.setGetRideRequestsAPIResponse(response)
            onSuccess()
         })
         .catch(APIError => {
            this.setGetMyRideRequestsAPIError(APIError)
            onFailure(APIError)
         })
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
