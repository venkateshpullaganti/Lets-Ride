import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../Common/utils/APIUtils'
import { apiMethods } from '../../Common/constants/APIConstants'

import myRideRequestsFixtures from '../fixtures/myRideRequestsFixtures.json'
import myAssetRequestsFixtures from '../fixtures/myAssetRequestsFixtures.json'

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
      return new Promise((_, reject) => {
         setTimeout(() => {
            reject()
         }, 1000)
      })
   }
   assetRequest = requestObject => {
      console.log('service', requestObject)
      return new Promise(resolve => {
         setTimeout(() => {
            resolve()
         }, 1000)
      })
   }
   rideShare = requestObject => {
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            reject()
         }, 2000)
      })
   }
   shareTravelInfoApi = requestObject => {
      return new Promise((resolve, reject) => {
         resolve()
      })
   }

   myAssetRequestsApi = (requestObj, paginationObj) => {
      const myassets = myAssetRequestsFixtures.assets.slice(
         paginationObj.offset,
         paginationObj.limit + paginationObj.offset
      )

      let response = {
         ...myAssetRequestsFixtures,
         assets: myassets
      }

      return new Promise(resolve => {
         setTimeout(() => {
            resolve(response)
         }, 1000)
      })
   }
   myRideRequestsApi = (requestObj, paginationObj) => {
      console.log(paginationObj)
      const myRides = myRideRequestsFixtures.rides.slice(
         paginationObj.offset,
         paginationObj.limit + paginationObj.offset
      )

      let response = {
         ...myRideRequestsFixtures,
         rides: myRides
      }

      return new Promise(resolve => {
         setTimeout(() => {
            resolve(response)
         }, 1000)
      })
   }
}
export { FixtureService }
