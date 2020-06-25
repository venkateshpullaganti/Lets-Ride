import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL, API_SUCCESS, APIStatus } from '@ib/api-constants'
import { observable, action } from 'mobx'
import { CommuteService } from '../../../services/CommuteService'
import { MatchingResultsRideType } from '../../types'

class RideMatchingResultsModel {
   id: number
   sourcePlace: string
   destinationPlace: string
   travelDate: string
   flexibleFromDate: string
   flexibleToDate: string
   isFlexible: boolean
   seatCount: number
   laguageCount: number
   requestedPerson: string
   requestedPersonMobile: string
   rideMatchingId: number

   commuteService: CommuteService

   @observable isAccepted: boolean
   @observable rideRequestApiStatus: APIStatus
   @observable rideRequestApiError: Error | null

   constructor(
      rideObj: MatchingResultsRideType,
      commuteAPIService: CommuteService
   ) {
      this.id = rideObj.ride_request_id
      this.sourcePlace = rideObj.source
      this.destinationPlace = rideObj.destination
      this.travelDate = rideObj.travel_date_time
      this.isFlexible = rideObj.flexible_timings
      this.flexibleFromDate = rideObj.flexible_from_date_time
      this.flexibleToDate = rideObj.flexible_to_date_time
      this.seatCount = rideObj.seats
      this.laguageCount = rideObj.laguage_quantity
      this.requestedPerson = rideObj.username
      this.requestedPersonMobile = rideObj.user_phone_number
      this.isAccepted = false
      this.rideMatchingId = rideObj.ride_matching_id

      this.commuteService = commuteAPIService
      this.rideRequestApiStatus = API_INITIAL
      this.rideRequestApiError = null
   }

   @action
   setGetRideRequestApiStatus = status => {
      this.rideRequestApiStatus = status
   }
   @action
   setGetRideRequestApiError = error => {
      this.rideRequestApiError = error
      console.log(error)
   }
   setGetRideRequestApiResponse = response => {}

   acceptRideRequest = () => {
      const requestObj = {
         ride_request_id: this.id,
         ride_matching_id: this.rideMatchingId
      }
      const requestPromise = this.commuteService.acceptRideRequest(requestObj)
      return bindPromiseWithOnSuccess(requestPromise)
         .to(this.setGetRideRequestApiStatus, this.setGetRideRequestApiResponse)
         .catch(this.setGetRideRequestApiError)
   }

   acceptRequest = async () => {
      await this.acceptRideRequest()
      if (this.rideRequestApiStatus === API_SUCCESS) this.isAccepted = true
   }
}

export { RideMatchingResultsModel }
