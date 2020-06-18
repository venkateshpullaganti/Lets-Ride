import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../Common/utils/APIUtils'
import { apiMethods } from '../../Common/constants/APIConstants'

class CommuteService {
   commuteAPI

   constructor() {
      this.commuteAPI = create({
         baseURL: 'https://1a62330d2625.ngrok.io/api/lets_ride'
      })
   }
   rideRequest = requestObject => {
      return networkCallWithApisauce(
         this.commuteAPI,
         '/ride_request/v1/',
         requestObject,
         apiMethods.post
      )
   }
   assetRequest = requestObject => {
      return networkCallWithApisauce(
         this.commuteAPI,
         '/asset_request/v1/',
         requestObject,
         apiMethods.post
      )
   }
   rideShare = requestObject => {
      return networkCallWithApisauce(
         this.commuteAPI,
         '/share_ride/v1/',
         requestObject,
         apiMethods.post
      )
   }
   shareTravelInfoApi = requestObject => {
      return networkCallWithApisauce(
         this.commuteAPI,
         '/share_travel_info/v1/',
         requestObject,
         apiMethods.post
      )
   }

   myAssetRequestsApi = (requestObject, otherParams) => {
      const limtAndOffset = `offset=${otherParams.offset}&limit=${otherParams.limit}`
      let status = ``

      let sortParams = ``

      if (otherParams.sort_key !== '' || otherParams.sort_key !== null)
         sortParams = `&sort_key=${otherParams.sort_key}&sort_value=${otherParams.sort_value}`

      if (otherParams.status !== '' && otherParams.status !== null)
         status = `&status=${otherParams.status}`

      let endPoint = `${limtAndOffset}`
      if (status !== '') endPoint = `${endPoint}${status}`
      if (sortParams !== '') endPoint = `${endPoint}${sortParams}`

      return networkCallWithApisauce(
         this.commuteAPI,
         `/my_requests/assets/v1/?${endPoint}`,
         requestObject,
         apiMethods.get
      )
   }
   myRideRequestsApi = (requestObject, otherParams) => {
      console.log('service', otherParams)
      const limtAndOffset = `offset=${otherParams.offset}&limit=${otherParams.limit}`
      let status = ``

      let sortParams = ``

      if (otherParams.sort_key !== '' || otherParams.sort_key !== null)
         sortParams = `&sort_key=${otherParams.sort_key}&sort_value=${otherParams.sort_value}`

      if (otherParams.status !== '' && otherParams.status !== null)
         status = `&status=${otherParams.status}`

      let endPoint = `${limtAndOffset}`
      if (status !== '') endPoint = `${endPoint}${status}`
      if (sortParams !== '') endPoint = `${endPoint}${sortParams}`

      return networkCallWithApisauce(
         this.commuteAPI,
         `/my_requests/rides/v1/?${endPoint}`,
         requestObject,
         apiMethods.get
      )
   }
   matchingResultsApi = (requestObject, otherParams) => {
      const limtAndOffset = `offset=${otherParams.offset}&limit=${otherParams.limit}`
      return networkCallWithApisauce(
         this.commuteAPI,
         `/matching_results/v1/?${limtAndOffset}`,
         requestObject,
         apiMethods.get
      )
   }
   acceptRideRequest = requestObj => {
      return networkCallWithApisauce(
         this.commuteAPI,
         '/accept_ride_request/v1/',
         requestObj,
         apiMethods.put
      )
   }
   acceptAssetTransportRequest = requestObj => {
      return networkCallWithApisauce(
         this.commuteAPI,
         `/accept_asset_request/v1/`,
         requestObj,
         apiMethods.put
      )
   }
}
export { CommuteService }
