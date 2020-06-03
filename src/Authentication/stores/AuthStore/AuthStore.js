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

   @observable getUserProfileAPIStatus
   @observable getUserProfileAPIError

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
      this.getUserProfileAPIStatus = API_INITIAL
      this.getUserProfileAPIError = null
   }
   @action.bound
   userSignIn(requestObject, onSuccess, onFailure) {
      const userSignInPromise = this.authAPIService.signInApi(requestObject)

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

   @action.bound
   setUserProfileAPIResponse(response) {
      
   }

   @action.bound
   setGetUserProfileAPIError(apiError) {
      this.getUserSignInAPIError = apiError
   }

   @action.bound
   setGetUserProfileAPIStatus(apiStatus) {
      this.getUserSignInAPIStatus = apiStatus
   }

   @action.bound
   getUserProfile(requestObject, onSuccess, onFailure) {
      const userProfilePromise = this.authAPIService.userProfileApi(
         requestObject
      )
      return bindPromiseWithOnSuccess(userProfilePromise)
         .to(this.setGetUserProfileAPIStatus, response => {
            this.setUserProfileAPIResponse(response)
            onSuccess()
         })
         .catch(apiError => {
            this.setGetUserProfileAPIError(apiError)
            onFailure()
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
