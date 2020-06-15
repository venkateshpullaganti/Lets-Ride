import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { getUserDisplayableErrorMessage } from '../../../Common/utils/APIUtils'

import {
   setAccessToken,
   clearUserSession
} from '../../../Common/utils/StorageUtils'

class AuthStore {
   @observable getUserSignInAPIStatus
   @observable getUserSignInAPIError

   @observable getUserProfileAPIStatus
   @observable getUserProfileAPIError

   @observable userProfile

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
      this.userProfile = null // Will save an userProfile object in this variable
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
      this.userProfile = {}
      this.userProfile.userName = response.username
      this.userProfile.phoneNumber = response.phone_number
      this.userProfile.profileImage = response.profile_pic_url
   }

   @action.bound
   setGetUserProfileAPIError(apiError) {
      this.getUserSignInAPIError = apiError
   }

   @action.bound
   setGetUserProfileAPIStatus(apiStatus) {
      this.getUserProfileAPIStatus = apiStatus
   }

   @action.bound
   getUserProfile(requestObject) {
      console.log('getUser')
      const userProfilePromise = this.authAPIService.userProfileApi(
         requestObject
      )
      return bindPromiseWithOnSuccess(userProfilePromise)
         .to(this.setGetUserProfileAPIStatus, response => {
            this.setUserProfileAPIResponse(response)
         })
         .catch(apiError => {
            this.setGetUserProfileAPIError(apiError)
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

// console.log(Object.entries(this.userProfile).length === 0, 'store obj')
