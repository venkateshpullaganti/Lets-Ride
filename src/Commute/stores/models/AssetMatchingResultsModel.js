class AssetMatchingResultsModel {
   id
   sourcePlace
   destinationPlace
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
   isAccepted
   requestedPerson
   requestedPersonMobile
   constructor(assetObj) {
      this.id = assetObj.asset_request_id
      this.sourcePlace = assetObj.source
      this.destinationPlace = assetObj.destination
      this.travelDate = assetObj.travel_date_time
      this.isFlexible = assetObj.flexible_timings
      this.flexibleFromDate = assetObj.flexible_from_date_time
      this.flexibleToDate = assetObj.flexible_to_date_time
      this.assetType = assetObj.asset_type
      this.assetQuantity = assetObj.asset_quantity
      this.assetTypeOthers = assetObj.asset_type_others
      this.assetSensitivity = assetObj.asset_sensitivity
      this.deliverTo = assetObj.deliver_to
      this.receiverPhoneNumber = assetObj.phone_number
      this.requestedPerson = assetObj.username
      this.requestedPersonMobile = assetObj.user_phone_number
      this.isAccepted = false
   }
   onAcceptRequest = () => {
      console.log('You accepted the request:', this.id)
      this.isAccepted = true
   }
}

export default AssetMatchingResultsModel
