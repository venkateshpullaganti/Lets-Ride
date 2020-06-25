import { History } from 'history'
import {
   HOMEPAGE_PATH,
   RIDE_REQUEST_PATH,
   ASSET_TRANSPORT_REQUEST_PATH,
   SHARE_TRAVEL_INFO_PATH,
   SHARE_RIDE_PATH
} from '../../constants/NavigationConstants'

export const goToHomePage = (history: History) => {
   history.push(HOMEPAGE_PATH)
}

export const goToRideRequestPage = (history: History) => {
   history.push(RIDE_REQUEST_PATH)
}
export const goToAssetRequestPage = (history: History) => {
   history.push(ASSET_TRANSPORT_REQUEST_PATH)
}
export const goToShareTravelInfoPage = (history: History) => {
   history.push(SHARE_TRAVEL_INFO_PATH)
}
export const goToRideSharePage = (history: History) => {
   history.push(SHARE_RIDE_PATH)
}
