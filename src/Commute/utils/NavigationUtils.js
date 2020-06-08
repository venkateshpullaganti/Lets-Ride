import {
   HOMEPAGE_PATH,
   RIDE_REQUEST_PATH,
   ASSET_TRANSPORT_REQUEST_PATH,
   SHARE_TRAVEL_INFO_PATH,
   SHARE_RIDE_PATH
} from '../constants/NavigationConstants'

export const goToHomePage = history => {
   history.push(HOMEPAGE_PATH)
}

export const goToRideRequestPage = history => {
   history.push(RIDE_REQUEST_PATH)
}
export const goToAssetRequestPage = history => {
   history.push(ASSET_TRANSPORT_REQUEST_PATH)
}
export const goToShareTravelInfoPage = history => {
   history.push(SHARE_TRAVEL_INFO_PATH)
}
export const goToRideSharePage = history => {
   history.push(SHARE_RIDE_PATH)
}

export const navigateToGivenPath = (givenPath, history) => {
   history.push(givenPath)
}
