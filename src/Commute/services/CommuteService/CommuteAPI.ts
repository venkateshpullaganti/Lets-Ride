import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import { CommuteService } from '.'

class CommuteAPI implements CommuteService {
   api: Record<string, any>

   constructor() {
      this.api = create({
         baseURL: 'https://1a62330d2625.ngrok.io/api/lets_ride'
      })
   }
   rideRequest = requestObject => {
      return networkCallWithApisauce(
         this.api,
         '/ride_request/v1/',
         requestObject,
         apiMethods.post
      )
   }
   assetRequest = requestObject => {
      return networkCallWithApisauce(
         this.api,
         '/asset_request/v1/',
         requestObject,
         apiMethods.post
      )
   }
   rideShare = requestObject => {
      return networkCallWithApisauce(
         this.api,
         '/share_ride/v1/',
         requestObject,
         apiMethods.post
      )
   }
   shareTravelInfoApi = requestObject => {
      return networkCallWithApisauce(
         this.api,
         '/share_travel_info/v1/',
         requestObject,
         apiMethods.post
      )
   }

   myAssetRequestsApi = otherParams => {
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
         this.api,
         `/my_requests/assets/v1/?${endPoint}`,
         {},
         apiMethods.get
      )
   }
   myRideRequestsApi = otherParams => {
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
         this.api,
         `/my_requests/rides/v1/?${endPoint}`,
         {},
         apiMethods.get
      )
   }
   matchingResultsApi = otherParams => {
      const limtAndOffset = `offset=${otherParams.offset}&limit=${otherParams.limit}`
      return networkCallWithApisauce(
         this.api,
         `/matching_results/v1/?${limtAndOffset}`,
         {},
         apiMethods.get
      )
   }
   acceptRideRequest = requestObj => {
      return networkCallWithApisauce(
         this.api,
         '/accept_ride_request/v1/',
         requestObj,
         apiMethods.put
      )
   }
   acceptAssetTransportRequest = requestObj => {
      return networkCallWithApisauce(
         this.api,
         `/accept_asset_request/v1/`,
         requestObj,
         apiMethods.put
      )
   }
}
export { CommuteAPI }
