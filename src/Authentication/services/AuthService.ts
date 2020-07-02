import { create, ApisauceInstance } from 'apisauce'

import { networkCallWithApisauce } from '../../Common/utils/APIUtils'
import { apiMethods } from '../../Common/constants/APIConstants'
import { UserSignInRequest } from '../stores/types'
import { Config } from '../../Common/constants/EnvironmentConstants'

class AuthService {
   api: ApisauceInstance
   constructor() {
      this.api = create({
         baseURL: Config.BASE_URL
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
   userProfileApi = (): Promise<any> => {
      return networkCallWithApisauce(
         this.api,
         '/user/profile/v1/',
         {},
         apiMethods.get
      )
   }
}
export { AuthService }
