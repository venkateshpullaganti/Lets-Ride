import { AssetRequestType } from '../../types'

class AssetRequestModel {
   id: number
   source: string
   destination: string
   travelDate: string
   flexibleFromDate: string
   flexibleToDate: string
   isFlexible: boolean
   assetType: string
   assetTypeOthers: string
   assetSensitivity: string
   assetQuantity: number
   deliverTo: string
   receiverPhoneNumber: string
   acceptedPerson: string
   acceptedPersonPhoneNumber: string
   status: string
   constructor(assetObj: AssetRequestType) {
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
   }
}

export default AssetRequestModel
