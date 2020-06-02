class AssetRequestModel {
   id
   source
   destination
   travelDate
   flexibleFromDate
   flexibleToDate
   isFlexible
   assetType
   assetTypeOthers
   assetSensitivity
   assetQuantity
   deliverTo
   receiverPhoneNumber
   acceptedPerson
   acceptedPersonPhoneNumber
   status
   constructor(rideObj) {
      this.id = rideObj.asset_request_id
      this.source = rideObj.source
      this.destination = rideObj.destination
      this.travelDate = rideObj.travel_date_time
      this.isFlexible = rideObj.flexible_timings
      this.flexibleFromDate = rideObj.flexible_from_date_time
      this.flexibleToDate = rideObj.flexible_to_date_time
      this.assetType = rideObj.asset_type
      this.assetQuantity = rideObj.asset_quantity
      this.assetTypeOthers = rideObj.asset_type_others
      this.assetSensitivity = rideObj.asset_sensitivity
      this.acceptedPerson = rideObj.accepted_person
      this.acceptedPersonPhoneNumber = rideObj.accepted_person_phone_number
      this.status = rideObj.status
      this.deliverTo = rideObj.deliver_to
      this.receiverPhoneNumber = rideObj.phone_number
   }
}

export default AssetRequestModel
