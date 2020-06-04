export const RIDE_TABLE_COLUMNS = [
   'FROM',
   'TO',
   'DATE AND TIME',
   'NO.OF PEOPLE',
   'LAGUAGE QUANTITY',
   'ACCEPTED PERSON DETAILS'
]

export const ASSET_TABLE_COLUMNS = [
   'FROM',
   'TO',
   'DATE AND TIME',
   'ASSET QUANTITY',
   'ASSET TYPE',
   'ASSET SENSITIVITY',
   'WHOM TO DELIVER',
   'ACCEPTED PERSON DETAILS'
]

export const MATCHING_RIDES_COLUMNS = [
   'REQUESTED PERSON DETAILS',
   'FROM',
   'TO',
   'DATE AND TIME',
   'NO.OF PEOPLE',
   'LAGUAGE QUANTITY',
   'STATUS'
]
export const MATCHING_ASSETS_COLUMN = [
   'REQUESTED PERSON DETAILS',
   'FROM',
   'TO',
   'DATE AND TIME',
   'ASSET QUANTITY',
   'ASSET TYPE',
   'ASSET SENSITIVITY',
   'WHOM TO DELIVER',
   'STATUS'
]

export const FILTER_OPTIONS = [
   { value: 'ACCEPTED', label: 'ACCEPTED' },
   { value: 'EXPIRED', label: 'EXPIRED' },
   { value: 'PENDING', label: 'PENDING' }
]

export const SORT_OPTIONS = [
   { value: 'seats', label: 'Seats' },
   { value: 'laguage_quantity', label: 'Laguage Quantity' }
]
