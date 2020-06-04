class RideMatchingResultsModel {
   id
   sourcePlace
   destinationPlace
   isFlexible
   travelDate
   flexibleFromDate
   flexibleToDate
   seatCount
   laguageCount
   requestedPerson
   requestedPersonMobile
   isAccepted
   constructor(rideObj) {
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
   }
}

export default RideMatchingResultsModel
