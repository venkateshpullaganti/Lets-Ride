import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../Common/utils/APIUtils'
import { apiMethods } from '../../Common/constants/APIConstants'

class FixtureService {
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
   }
   assetRequest = requestObject => {
      return new Promise((resolve, reject) => {
         resolve()
      })
   }
   rideShare = requestObject => {
      return new Promise((resolve, reject) => {
         reject()
      })
   }
   travelInfo = requestObject => {
      return new Promise((resolve, reject) => {
         resolve()
      })
   }
}
export { FixtureService }
