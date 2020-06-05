import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../Common/utils/APIUtils'
import { apiMethods } from '../../Common/constants/APIConstants'

class AuthService {
   api
   constructor() {
      this.api = create({
         baseURL: 'https://f3ade051cc9a.ngrok.io/api/lets_ride'
      })
      this.profileApi = create({
         baseURL: 'https://f3ade051cc9a.ngrok.io/api/lets_ride'
      })
   }
   signInApi = requestObject => {
      return networkCallWithApisauce(
         this.api,
         '/login/v1/',
         requestObject,
         apiMethods.post
      )
   }
   userProfileApi = requestObject => {
      return networkCallWithApisauce(
         this.profileApi,
         '/user/profile/v1/',
         requestObject,
         apiMethods.get
      )
   }
}
export { AuthService }
