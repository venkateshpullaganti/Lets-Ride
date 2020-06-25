export type RequestStatus = Array<string>

export interface RideRequestType {
   ride_request_id: number
   source: string
   destination: string
   flexible_timings: boolean
   travel_date_time: string
   flexible_from_date_time: string
   flexible_to_date_time: string
   seats: number
   laguage_quantity: number
   status: string
   accepted_person: string
   accepted_person_phone_number: string
}

export interface AssetRequestType {
   asset_request_id: number
   source: string
   destination: string
   flexible_timings: boolean
   travel_date_time: string
   flexible_from_date_time: string
   flexible_to_date_time: string
   asset_type: string
   asset_sensitivity: string
   asset_quantity: number
   asset_type_others: string
   status: string
   accepted_person: string
   accepted_person_phone_number: string
   deliver_to: string
   phone_number: string
}
export interface MatchingResultsRideType {
   ride_request_id: number
   source: string
   destination: string
   travel_date_time: string
   flexible_timings: boolean
   flexible_from_date_time: string
   flexible_to_date_time: string
   seats: number
   laguage_quantity: number
   username: string
   user_phone_number: string
   ride_matching_id: number
   travel_matching_id: number
}
export interface MatchingResultsAssetType {
   asset_request_id: number
   username: string
   user_phone_number: string
   source: string
   destination: string
   travel_date_time: string
   flexible_timings: boolean
   flexible_from_date_time: string
   flexible_to_date_time: string
   asset_quantity: number
   asset_type: string
   asset_type_others: string
   asset_sensitivity: string
   deliver_to: string
   phone_number: string
   ride_matching_id: number
   travel_matching_id: number
}

export interface QueryParametersObject {
   limit: number
   offset: number
   status: string
   sort_key: string
   sort_value: string
}

export interface PostRideRequest {
   source: string
   destination: string
   flexible_timings: boolean
   travel_date_time: string
   flexible_from_date_time: string
   flexible_to_date_time: string
   seats: number
   laguage_quantity: number
}

export interface PostAssetRequest {
   source: string
   destination: string
   flexible_timings: boolean
   travel_date_time: string
   flexible_from_date_time: string
   flexible_to_date_time: string
   asset_quantity: number
   asset_type: string
   asset_sensitivity: string
   asset_type_others: string
   deliver_to: string
   phone_number: string
}

export interface PostRideShareRequest {
   source: string
   destination: string
   flexible_timings: boolean
   travel_date_time: string
   flexible_from_date_time: string
   flexible_to_date_time: string
   seats: number
   asset_quantity: number
}

export interface PostShareTravelInfoRequest {
   source: string
   destination: string
   flexible_timings: boolean
   travel_date_time: string
   flexible_from_date_time: string
   flexible_to_date_time: string
   travel_medium: string
   asset_quantity: number
}

export interface GetRideRequestsResponse {
   rides: Array<RideRequestType>
   total_rides: number
   filter_options: Array<string>
   sort_options: Array<string>
}

export interface GetAssetRequestsResponse {
   assets: Array<AssetRequestType>
   total_assets: number
   filter_options: Array<string>
   sort_options: Array<string>
}

export interface GetMatchingResultsResponse {
   total_assets: number
   total_rides: number
   rides: Array<MatchingResultsRideType>
   assets: Array<MatchingResultsAssetType>
}
export interface PutAcceptRideRequestObject {
   ride_request_id: number
   ride_matching_id: number
}
export interface PutAcceptAssetRequestObject {
   asset_request_id: number
   travel_matching_id: number
   ride_matching_id: number
}
