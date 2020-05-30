import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../Common/utils/APIUtils'
import { apiMethods } from '../../Common/constants/APIConstants'

class CommuteService {
   rideRequestApi
   assetRequestApi

   rideShareApi
   travelInfoApi

   myRequestsApi

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
      this.myRequestsApi = create({
         baseURL: 'localhost:8000/api/lets_ride'
      })
   }
   rideRequest = requestObject => {
      return networkCallWithApisauce(
         this.rideRequestApi,
         '/ride_request/v1/ ',
         requestObject,
         apiMethods.get
      )
   }
   assetRequest = requestObject => {
      return networkCallWithApisauce(
         this.assetRequestApi,
         '/asset_request/v1/',
         requestObject,
         apiMethods.get
      )
   }
   rideShare = requestObject => {
      return networkCallWithApisauce(
         this.rideShareApi,
         '/share_ride/v1/',
         requestObject,
         apiMethods.get
      )
   }
   travelInfo = requestObject => {
      return networkCallWithApisauce(
         this.travelInfoApi,
         '/share_travel_info/v1/',
         requestObject,
         apiMethods.get
      )
   }
   myRequests = requestObject => {
      return networkCallWithApisauce(
         this.myRequestsApi,
         '/my_rquests/v1',
         requestObject,
         apiMethods.get
      )
   }
}
export { CommuteService }
