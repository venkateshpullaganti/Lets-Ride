import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { AuthService } from '../../services/AuthService'
import {
   setAccessToken,
   clearUserSession
} from '../../../Common/utils/StorageUtils'

import UserProfileModel from '../Models/UserProfileModel'
import { FixtureService } from '../../services/FixtureService'
import { ApiErrorResponse } from 'apisauce'
import {
   UserSignInResponse,
   UserSignInRequest,
   UserProfileAPIResponse
} from '../types'

class AuthStore {
   @observable getUserSignInAPIStatus!: number
   @observable getUserSignInAPIError!: Error | null

   @observable getUserProfileAPIStatus!: number
   @observable getUserProfileAPIError!: Error | null

   @observable userProfile!: UserProfileModel | null

   authAPIService: AuthService | FixtureService

   constructor(authService: AuthService | FixtureService) {
      this.authAPIService = authService
      this.init()
   }

   @action.bound
   setUserSignInAPIResponse(response: UserSignInResponse): void {
      setAccessToken(response.access_token)
   }

   @action.bound
   setGetUserSignInAPIError(apiError: Error): void {
      this.getUserSignInAPIError = apiError
   }

   @action.bound
   setGetUserSignInAPIStatus(apiStatus: number): void {
      this.getUserSignInAPIStatus = apiStatus
   }

   @action.bound
   init(): void {
      this.getUserSignInAPIStatus = API_INITIAL
      this.getUserSignInAPIError = null
      this.getUserProfileAPIStatus = API_INITIAL
      this.getUserProfileAPIError = null
      this.userProfile = null
   }
   @action.bound
   userSignIn(
      requestObject: UserSignInRequest,
      onSuccess: () => void,
      onFailure: (error: any) => void
   ): Promise<any> {
      const userSignInPromise = this.authAPIService.signInApi(requestObject)

      return bindPromiseWithOnSuccess(userSignInPromise)
         .to(this.setGetUserSignInAPIStatus, (response: UserSignInResponse) => {
            this.setUserSignInAPIResponse(response)
            onSuccess()
         })
         .catch((apiError: Error) => {
            this.setGetUserSignInAPIError(apiError)
            onFailure(apiError)
         })
   }

   @action.bound
   setUserProfileAPIResponse(response: UserProfileAPIResponse): void {
      this.userProfile = new UserProfileModel(response)
   }

   @action.bound
   setGetUserProfileAPIError(apiError: Error): void {
      this.getUserSignInAPIError = apiError
   }

   @action.bound
   setGetUserProfileAPIStatus(apiStatus: number): void {
      this.getUserProfileAPIStatus = apiStatus
   }

   @action.bound
   getUserProfile(): Promise<any> {
      const userProfilePromise = this.authAPIService.userProfileApi()
      return bindPromiseWithOnSuccess(userProfilePromise)
         .to(this.setGetUserProfileAPIStatus, this.setUserProfileAPIResponse)
         .catch(this.setGetUserProfileAPIError)
   }

   @action.bound
   userSignOut(): void {
      clearUserSession()
      this.clearStore()
   }

   @action.bound
   clearStore(): void {
      this.init()
   }
}
export { AuthStore }
