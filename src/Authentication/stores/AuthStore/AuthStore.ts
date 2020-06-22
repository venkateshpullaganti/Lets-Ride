import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { AuthService } from '../../services/AuthService'
import {
   setAccessToken,
   clearUserSession
} from '../../../Common/utils/StorageUtils'

import UserProfileModel from '../Models/UserProfileModel'

type userSignInResponse = {
   user_id: string
   access_token: string
}

class AuthStore {
   @observable getUserSignInAPIStatus!: number
   @observable getUserSignInAPIError!: string | null

   @observable getUserProfileAPIStatus!: number
   @observable getUserProfileAPIError!: string | null

   @observable userProfile!: null | Object

   authAPIService: AuthService

   constructor(authService: AuthService) {
      this.authAPIService = authService
      this.init()
   }

   @action.bound
   setUserSignInAPIResponse(response: userSignInResponse) {
      setAccessToken(response.access_token)
   }

   @action.bound
   setGetUserSignInAPIError(apiError: string) {
      this.getUserSignInAPIError = apiError
   }

   @action.bound
   setGetUserSignInAPIStatus(apiStatus: number) {
      this.getUserSignInAPIStatus = apiStatus
   }

   @action.bound
   init() {
      this.getUserSignInAPIStatus = API_INITIAL
      this.getUserSignInAPIError = null
      this.getUserProfileAPIStatus = API_INITIAL
      this.getUserProfileAPIError = null
      this.userProfile = null
   }
   @action.bound
   userSignIn(
      requestObject,
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) {
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
      this.userProfile = new UserProfileModel(response)
   }

   @action.bound
   setGetUserProfileAPIError(apiError) {
      this.getUserSignInAPIError = apiError
   }

   @action.bound
   setGetUserProfileAPIStatus(apiStatus: number) {
      this.getUserProfileAPIStatus = apiStatus
   }

   @action.bound
   getUserProfile(requestObject) {
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
