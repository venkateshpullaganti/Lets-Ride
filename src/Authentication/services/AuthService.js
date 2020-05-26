import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../utils/APIUtils'
import { apiMethods } from '../../constants/APIConstants'

import SignInFixture from '../fixtures/SignInFixture.json'

class AuthService {
   api
   constructor() {
      this.api = create({
         baseURL: 'https://5ea1a14db9f5ca00166c1f27.mockapi.io/api/lets_ride/'
      })
   }
   signInAPI = requestObject => {
      return new Promise((resolve, reject) => {
         resolve(SignInFixture)
      })
      //   return networkCallWithApisauce(
      //      this.api,
      //      'sign_in/v1',
      //      requestObject,
      //      apiMethods.post
      //   )
   }
}
export { AuthService }
