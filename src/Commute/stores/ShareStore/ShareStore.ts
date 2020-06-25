import React from 'react'
import { observable, action } from 'mobx'
import { API_INITIAL, APIStatus } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

class ShareStore {
   @observable getRideShareAPIStatus!: APIStatus
   @observable getRideShareAPIError!: Error | null

   @observable getTravelInfoAPIStatus!: APIStatus
   @observable getTravelInfoAPIError!: Error | null

   commuteAPIService

   constructor(CommuteService) {
      this.commuteAPIService = CommuteService
      this.init()
   }

   @action.bound
   setRideShareAPIResponse(response) {}

   @action.bound
   setGetRideShareAPIError(APIError) {
      this.getRideShareAPIError = APIError
   }

   @action.bound
   setGetRideShareAPIStatus(APIStatus) {
      this.getRideShareAPIStatus = APIStatus
   }

   @action.bound
   init() {
      this.getRideShareAPIStatus = API_INITIAL
      this.getRideShareAPIError = null

      this.getTravelInfoAPIStatus = API_INITIAL
      this.getTravelInfoAPIError = null
   }
   @action.bound
   rideShare(requestObject, onSuccess, onFailure) {
      const rideSharePromise = this.commuteAPIService.rideShare(requestObject)

      return bindPromiseWithOnSuccess(rideSharePromise)
         .to(this.setGetRideShareAPIStatus, response => {
            this.setRideShareAPIResponse(response)
            onSuccess()
         })
         .catch(APIError => {
            this.setGetRideShareAPIError(APIError)
            onFailure(APIError)
         })
   }

   @action.bound
   setTravelInfoAPIResponse(response) {}

   @action.bound
   setGetTravelInfoAPIError(APIError) {
      this.getTravelInfoAPIError = APIError
   }

   @action.bound
   setGetTravelInfoAPIStatus(APIStatus) {
      this.getTravelInfoAPIStatus = APIStatus
   }

   @action.bound
   shareTravelInfo(requestObject, onSuccess, onFailure) {
      const travelInfoPromise = this.commuteAPIService.shareTravelInfoApi(
         requestObject
      )

      return bindPromiseWithOnSuccess(travelInfoPromise)
         .to(this.setGetTravelInfoAPIStatus, response => {
            this.setTravelInfoAPIResponse(response)
            onSuccess()
         })
         .catch(APIError => {
            this.setGetTravelInfoAPIError(APIError)
            onFailure(APIError)
         })
   }

   @action.bound
   clearStore() {
      this.init()
   }
}
export { ShareStore }
