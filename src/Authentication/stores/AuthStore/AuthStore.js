import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import {
   setAccessToken,
   clearUserSession
} from '../../../Common/utils/StorageUtils'

class AuthStore {
   @observable getUserSignInAPIStatus
   @observable getUserSignInAPIError
   authAPIService

   constructor(authService) {
      this.authAPIService = authService
      this.init()
   }

   @action.bound
   setUserSignInAPIResponse(response) {
      setAccessToken(response.access_token)
   }

   @action.bound
   setGetUserSignInAPIError(apiError) {
      this.getUserSignInAPIError = apiError
   }

   @action.bound
   setGetUserSignInAPIStatus(apiStatus) {
      this.getUserSignInAPIStatus = apiStatus
   }

   @action.bound
   init() {
      this.getUserSignInAPIStatus = API_INITIAL
      this.getUserSignInAPIError = null
   }
   @action.bound
   userSignIn(requestObject, onSuccess, onFailure) {
      console.log('userSignin', this.getUserSignInAPIStatus)
      const userSignInPromise = this.authAPIService.signInAPI(requestObject)

      return bindPromiseWithOnSuccess(userSignInPromise)
         .to(this.setGetUserSignInAPIStatus, response => {
            this.setUserSignInAPIResponse(response)
            onSuccess()
         })
         .catch(apiError => {
            this.setGetUserSignInAPIError(apiError)
            onFailure(apiError)
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
