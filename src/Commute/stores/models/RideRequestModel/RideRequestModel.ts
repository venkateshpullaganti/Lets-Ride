import { RideRequestType } from '../../types'

class RideRequestModel {
   id: number
   sourcePlace: string
   destinationPlace: string
   travelDate: string
   flexibleFromDate: string
   flexibleToDate: string
   isFlexible: boolean
   seatCount: number
   laguageCount: number
   acceptedPerson: string
   acceptedPersonPhoneNumber: string
   status: string

   constructor(rideObj: RideRequestType) {
      this.id = rideObj.ride_request_id
      this.sourcePlace = rideObj.source
      this.destinationPlace = rideObj.destination
      this.travelDate = rideObj.travel_date_time
      this.isFlexible = rideObj.flexible_timings
      this.flexibleFromDate = rideObj.flexible_from_date_time
      this.flexibleToDate = rideObj.flexible_to_date_time
      this.seatCount = rideObj.seats
      this.laguageCount = rideObj.laguage_quantity
      this.acceptedPerson = rideObj.accepted_person
      this.acceptedPersonPhoneNumber = rideObj.accepted_person_phone_number
      this.status = rideObj.status
   }
}

export default RideRequestModel
