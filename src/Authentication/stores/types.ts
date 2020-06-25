export type UserSignInResponse = {
   user_id: string
   access_token: string
}
export type UserSignInRequest = {
   phone_number: string
   password: string
}
export type UserProfileAPIResponse = {
   username: string
   phone_number: string
   profile_pic_url: string
}
