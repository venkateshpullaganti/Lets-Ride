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
