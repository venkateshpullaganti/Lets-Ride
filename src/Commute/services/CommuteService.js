import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../Common/utils/APIUtils'
import { apiMethods } from '../../Common/constants/APIConstants'

class CommuteService {
   rideRequestApi
   assetRequestApi

   rideShareApi
   travelInfoApi

   constructor() {
      this.rideRequestApi = create({
         baseURL: 'localhost:8000/api'
      })
      this.assetRequestApi = create({
         baseURL: 'localhost:8000/api'
      })

      this.rideShareApi = create({
         baseURL: 'localhost:8000/api'
      })
      this.travelInfoApi = create({
         baseURL: 'localhost:8000/api'
      })
   }
   rideRequest = requestObject => {
      return new Promise((resolve, reject) => {})
      //   return networkCallWithApisauce(
      //      this.api,
      //      '/ride_request/v1/ ',
      //      requestObject,
      //      apiMethods.get
      //   )
   }
   assetRequest = requestObject => {
      return new Promise((resolve, reject) => {
         resolve()
      })
      //   return networkCallWithApisauce(
      //      this.api,
      //      '/asset_request/v1/',
      //      requestObject,
      //      apiMethods.get
      //   )
   }
   rideShare = requestObject => {
      return new Promise((resolve, reject) => {
         resolve()
      })
      //   return networkCallWithApisauce(
      //      this.api,
      //      '/share_ride/v1/',
      //      requestObject,
      //      apiMethods.get
      //   )
   }
   travelInfo = requestObject => {
      return new Promise((resolve, reject) => {
         resolve()
      })
      //   return networkCallWithApisauce(
      //      this.api,
      //      '/share_travel_info/v1/',
      //      requestObject,
      //      apiMethods.get
      //   )
   }
}
export { CommuteService }
