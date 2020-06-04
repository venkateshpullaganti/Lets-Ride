class AssetMatchingResultsModel {
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
   username
   userPhoneNumber
   constructor(assetObj) {
      this.id = assetObj.asset_request_id
      this.source = assetObj.source
      this.destination = assetObj.destination
      this.travelDate = assetObj.travel_date_time
      this.isFlexible = assetObj.flexible_timings
      this.flexibleFromDate = assetObj.flexible_from_date_time
      this.flexibleToDate = assetObj.flexible_to_date_time
      this.assetType = assetObj.asset_type
      this.assetQuantity = assetObj.asset_quantity
      this.assetTypeOthers = assetObj.asset_type_others
      this.assetSensitivity = assetObj.asset_sensitivity
      this.acceptedPerson = assetObj.accepted_person
      this.acceptedPersonPhoneNumber = assetObj.accepted_person_phone_number
      this.status = assetObj.status
      this.deliverTo = assetObj.deliver_to
      this.receiverPhoneNumber = assetObj.phone_number
      this.username = assetObj.username
      this.userPhoneNumber = assetObj.user_phone_number
   }
}

export default AssetMatchingResultsModel
