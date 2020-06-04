import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../Common/utils/APIUtils'
import { apiMethods } from '../../Common/constants/APIConstants'

class CommuteService {
   rideRequestApi
   assetRequestApi

   rideShareApi
   travelInfoApi

   myRequestsApi

   myAssetsRequestsAPI

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
      this.myAssetsRequestsAPI = create({
         baseURL: 'localhost:8000/api/lets_ride/assets/v1'
      })
      this.myRideRequestsAPI = create({
         baseURL: 'localhost:8000/api/lets_ride/ride/v1'
      })
   }
   rideRequest = requestObject => {
      return networkCallWithApisauce(
         this.rideRequestApi,
         '/ride_request/v1/ ',
         requestObject,
         apiMethods.post
      )
   }
   assetRequest = requestObject => {
      return networkCallWithApisauce(
         this.assetRequestApi,
         '/asset_request/v1/',
         requestObject,
         apiMethods.post
      )
   }
   rideShare = requestObject => {
      return networkCallWithApisauce(
         this.rideShareApi,
         '/share_ride/v1/',
         requestObject,
         apiMethods.post
      )
   }
   shareTravelInfoApi = requestObject => {
      return networkCallWithApisauce(
         this.travelInfoApi,
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
         this.myAssetsRequestsAPI,
         `/asets/v1/?${endPoint}`,
         requestObject,
         apiMethods.get
      )
   }
   myRideRequestsApi = (requestObject, otherParams) => {
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
         this.myRideRequestsAPI,
         `/rides/v1/?${endPoint}`,
         requestObject,
         apiMethods.get
      )
   }
   matchingResultsApi = (requestObject, otherParams) => {
      const limtAndOffset = `offset=${otherParams.offset}&limit=${otherParams.limit}`
      return networkCallWithApisauce(
         this.myRideRequestsAPI,
         `/matching_results/v1/?${limtAndOffset}`,
         requestObject,
         apiMethods.get
      )
   }
}
export { CommuteService }

//  /rides/v1/?offset=1&limit=5&status=filtervalue&sort_key=sortvalue&sort_value=ASC

//  otherParams = {
//     limit: PAGINATION_LIMIT,
//     offset: this.assetPaginationOffset,
//     status: this.assetSelectedFilter,
//     sort_key: this.assetSelectedSort,
//     sort_value: 'ASC'
//  }
