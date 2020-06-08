export const PAGINATION_LIMIT = 2

export const HOMEPAGE_PATH = '/home'
export const HOME_PREFIX = '/home'

export const RIDE_REQUEST_PATH = `${HOME_PREFIX}/request-ride`
export const ASSET_TRANSPORT_REQUEST_PATH = `${HOME_PREFIX}/request-asset-transport`

export const SHARE_RIDE_PATH = `${HOME_PREFIX}/share-ride`
export const SHARE_TRAVEL_INFO_PATH = `${HOME_PREFIX}/share-travel-info`

export const REQUEST_PATHS = [
   { path: RIDE_REQUEST_PATH, name: 'Ride' },
   { path: ASSET_TRANSPORT_REQUEST_PATH, name: 'Asset Transport' }
]

export const SHARE_PATHS = [
   { path: SHARE_RIDE_PATH, name: 'Ride' },
   { path: SHARE_TRAVEL_INFO_PATH, name: 'Travel Info' }
]
