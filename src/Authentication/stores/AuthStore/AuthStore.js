import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { setAccessToken, clearUserSession } from '../../../utils/StorageUtils'

class AuthStore {
   @observable getUserSignInAPIStatus
   @observable getUserSignInAPIError
   authAPIService

   constructor(AuthService) {
      this.authAPIService = AuthService
      this.init()
   }

   @action.bound
   setUserSignInAPIResponse(response) {
      setAccessToken(response.access_token)
   }

   @action.bound
   setGetUserSignInAPIError(APIError) {
      this.getUserSignInAPIError = APIError
   }

   @action.bound
   setGetUserSignInAPIStatus(APIStatus) {
      this.getUserSignInAPIStatus = APIStatus
   }

   @action.bound
   init() {
      this.getUserSignInAPIStatus = API_INITIAL
      this.getUserSignInAPIError = null
   }
   @action.bound
   userSignIn(requestObject, onSuccess, onFailure) {
      const userSignInPromise = this.authAPIService.signInAPI(requestObject)

      return bindPromiseWithOnSuccess(userSignInPromise)
         .to(this.setGetUserSignInAPIStatus, response => {
            this.setUserSignInAPIResponse(response)
            onSuccess()
         })
         .catch(APIError => {
            this.setGetUserSignInAPIError(APIError)
            onFailure(APIError)
         })
   }

   userSignOut = () => {
      clearUserSession()
      this.clearStore()
   }

   @action.bound
   clearStore() {
      this.init()
   }
}
export { AuthStore }
