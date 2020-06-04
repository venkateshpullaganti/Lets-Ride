import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../Common/utils/APIUtils'
import { apiMethods } from '../../Common/constants/APIConstants'

class AuthService {
   api
   constructor() {
      this.api = create({
         baseURL: 'https://54.179.25.78'
      })
      this.profileApi = create({
         baseURL: 'https://54.179.25.78'
      })
   }
   signInApi = requestObject => {
      return networkCallWithApisauce(
         this.api,
         '/sign_in/v1',
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
