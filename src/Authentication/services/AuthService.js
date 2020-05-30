import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../Common/utils/APIUtils'
import { apiMethods } from '../../Common/constants/APIConstants'

class AuthService {
   api
   constructor() {
      this.api = create({
         baseURL: 'https://5ea1a14db9f5ca00166c1f27.mockapi.io/api/lets_ride/'
      })
   }
   signInAPI = requestObject => {
      return networkCallWithApisauce(
         this.api,
         'sign_in/v1',
         requestObject,
         apiMethods.get
      )
   }
}
export { AuthService }
