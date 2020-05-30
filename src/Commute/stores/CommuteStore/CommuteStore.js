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
   setRequestsAPIResponse(response) {
      this.totalMyRideRequests = response.total_rides
      this.totalMyAssetRequests = response.total_assets
      this.myRideRequests = response.rides.map(eachRide => {
         return new RideRequestModel({ ...eachRide, id: uuid().toString() })
      })

      this.myAssetRequests = response.assets.map(eachRide => {
         return new AssetRequestModel({ ...eachRide, id: uuid().toString() })
      })
      console.log(this.myAssetRequests)
      console.log(this.myRideRequests[2].travelDate)
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
   init() {
      this.getMyRequestsAPIStatus = API_INITIAL
      this.getMyRequestsAPIError = null
      this.myRideRequests = []
      this.myAssetRequests = []
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

// const tableData = [
//    [
//       'sourcePlace',
//       'destinationPlace',
//       false,
//       'mainDate',
//       'fromDate',
//       'toDate',
//       'toDate',
//       'toDate',
//       'accept per',
//       '123456',
//       'pending'
//    ],
//    [
//       'sourcePlace',
//       'destinationPlace',
//       true,
//       'mainDate',
//       'fromDate',
//       'toDate',
//       '4',
//       '9',
//       'accept per',
//       '123456',
//       'pending'
//    ],
//    [
//       'sourcePlace',
//       'destinationPlace',
//       true,
//       'mainDate',
//       'fromDate',
//       'toDate',
//       '4',
//       '9',
//       'accept per',
//       '123456',
//       'expired'
//    ],
//    [
//       'sourcePlace',
//       'destinationPlace',
//       true,
//       'mainDate',
//       'fromDate',
//       'toDate',
//       '4',
//       '9',
//       'accept per',
//       '123456',
//       'pending'
//    ],
//    [
//       'sourcePlace',
//       'destinationPlace',
//       true,
//       'mainDate',
//       'fromDate',
//       'toDate',
//       '4',
//       '9',
//       'accept per',
//       '123456',
//       'pending'
//    ],
//    [
//       'sourcePlace',
//       'destinationPlace',
//       true,
//       'mainDate',
//       'fromDate',
//       'toDate',
//       '4',
//       '9',
//       'accept per',
//       '123456',
//       'Confirmed'
//    ]
// ]
