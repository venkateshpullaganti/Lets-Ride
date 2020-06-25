import { create, ApisauceInstance } from 'apisauce'

import { networkCallWithApisauce } from '../../Common/utils/APIUtils'
import { apiMethods } from '../../Common/constants/APIConstants'
import { UserSignInRequest } from '../stores/types'

class AuthService {
   api: ApisauceInstance
   constructor() {
      this.api = create({
         baseURL: 'https://1a62330d2625.ngrok.io/api/lets_ride'
      })
   }
   signInApi = (requestObject: UserSignInRequest): Promise<any> => {
      return networkCallWithApisauce(
         this.api,
         '/login/v1/',
         requestObject,
         apiMethods.post
      )
   }
   userProfileApi = (requestObject): Promise<any> => {
      return networkCallWithApisauce(
         this.api,
         '/user/profile/v1/',
         requestObject,
         apiMethods.get
      )
   }
}
export { AuthService }
