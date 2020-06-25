export type OptionType = {
   label: string
   value: string
}

export type OptionsType = Array<OptionType>

export type FormDataType = {
   sourcePlace: string
   destinationPlace: string
   isFlexible: boolean
   flexibleFromDate: string
   flexibleToDate: string
   assetCount: number
   travelDate: string
   selectedAssetSensitivity: string
   selectedAssetType: string | null
   whomToDeliver: string
   assetTypeOthers: string
}
export interface CommonFormDataType {
   sourcePlace: string
   destinationPlace: string
   isFlexible: boolean
   flexibleFromDate: string
   flexibleToDate: string
   travelDate: string
}
export interface RideFromData extends CommonFormDataType {
   seatCount: number
   laguageCount: number
}
export interface ShareTravelInfoData extends CommonFormDataType {
   travelMedium: string
   assetCount: number
}
