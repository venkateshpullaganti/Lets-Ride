import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import myRideRequestsFixtures from '../../fixtures/myRideRequestsFixtures.json'
import myAssetRequestsFixtures from '../../fixtures/myAssetRequestsFixtures.json'
import matchingResultsFixtures from '../../fixtures/matchingResultsFixtures.json'

import { CommuteService } from '.'

class FixtureService implements CommuteService {
   rideRequest = requestObject => {
      return resolveWithTimeout({})
   }
   assetRequest = requestObject => {
      return resolveWithTimeout({})
   }
   rideShare = requestObject => {
      return resolveWithTimeout({})
   }
   shareTravelInfoApi = requestObject => {
      return resolveWithTimeout({})
   }

   myAssetRequestsApi = paginationObj => {
      const myassets = myAssetRequestsFixtures.assets.slice(
         paginationObj.offset,
         paginationObj.limit + paginationObj.offset
      )

      let response = {
         ...myAssetRequestsFixtures,
         assets: myassets
      }

      return resolveWithTimeout(response)
   }
   myRideRequestsApi = paginationObj => {
      const myRides = myRideRequestsFixtures.rides.slice(
         paginationObj.offset,
         paginationObj.limit + paginationObj.offset
      )

      let response = {
         ...myRideRequestsFixtures,
         rides: myRides
      }

      return resolveWithTimeout(response)
   }
   matchingResultsApi = paginationObj => {
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

      return resolveWithTimeout(response)
   }
   acceptRideRequest = requestObj => {
      return resolveWithTimeout({})
   }
   acceptAssetTransportRequest = requestObj => {
      return resolveWithTimeout({})
   }
}

export { FixtureService }
