import {
   PostRideRequest,
   PostAssetRequest,
   PostRideShareRequest,
   PostShareTravelInfoRequest,
   GetMatchingResultsResponse,
   GetAssetRequestsResponse,
   QueryParametersObject,
   GetRideRequestsResponse,
   PutAcceptRideRequestObject,
   PutAcceptAssetRequestObject
} from '../../stores/types'

export interface CommuteService {
   rideRequest: (requestObject: PostRideRequest) => Promise<{}>

   assetRequest: (requestObject: PostAssetRequest) => Promise<{}>

   rideShare: (requestObject: PostRideShareRequest) => Promise<{}>

   shareTravelInfoApi: (
      requestObject: PostShareTravelInfoRequest
   ) => Promise<{}>

   myAssetRequestsApi: (
      otherParama: QueryParametersObject
   ) => Promise<GetAssetRequestsResponse>

   myRideRequestsApi: (
      otherParama: QueryParametersObject
   ) => Promise<GetRideRequestsResponse>

   matchingResultsApi: (
      otherParama: QueryParametersObject
   ) => Promise<GetMatchingResultsResponse>

   acceptRideRequest: (
      responseObject: PutAcceptRideRequestObject
   ) => Promise<{}>

   acceptAssetTransportRequest: (
      responseObject: PutAcceptAssetRequestObject
   ) => Promise<{}>
}
