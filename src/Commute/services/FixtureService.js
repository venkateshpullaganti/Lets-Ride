import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../Common/utils/APIUtils'
import { apiMethods } from '../../Common/constants/APIConstants'

import myRideRequestsFixtures from '../fixtures/myRideRequestsFixtures.json'
import myAssetRequestsFixtures from '../fixtures/myAssetRequestsFixtures.json'
import matchingResultsFixtures from '../fixtures/matchingResultsFixtures.json'

class FixtureService {
   api

   constructor() {
      this.api = create({
         baseURL: 'localhost:8000/api'
      })
   }
   rideRequest = requestObject => {
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve()
         }, 1000)
      })
   }
   assetRequest = requestObject => {
      return new Promise(resolve => {
         setTimeout(() => {
            resolve()
         }, 1000)
      })
   }
   rideShare = requestObject => {
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve()
         }, 2000)
      })
   }
   shareTravelInfoApi = requestObject => {
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve()
         }, 1000)
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
   matchingResultsApi = (requestObj, paginationObj) => {
      const myRides = matchingResultsFixtures.rides.slice(
         paginationObj.offset,
         paginationObj.limit + paginationObj.offset
      )
      const myAssets = matchingResultsFixtures.assets.slice(
         paginationObj.offset,
         paginationObj.limit + paginationObj.offset
      )

      let response = {
         ...matchingResultsFixtures,
         rides: myRides,
         assets: myAssets
      }

      return new Promise(resolve => {
         setTimeout(() => {
            resolve(response)
         }, 1000)
      })
   }
   acceptRideRequest = requestObj => {
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            reject(new Error('Network failure'))
         }, 500)
      })
   }
   acceptAssetTransportRequest = requestObj => {
      return new Promise(resolve => {
         setTimeout(() => {
            resolve()
         }, 1000)
      })
   }
}
export { FixtureService }
