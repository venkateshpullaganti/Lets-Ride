import Cookie from 'js-cookie'

import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import { AuthService } from '../../services/AuthService'
import getUserSignInFixture from '../../fixtures/getUserSignInFixture.json'

import { AuthStore } from '.'

let mockSetCookie = jest.fn()
let mockRemoveCookie = jest.fn()

Cookie.set = mockSetCookie
Cookie.remove = mockRemoveCookie

describe('AuthStore Tests', () => {
   let authAPI
   let authStore

   beforeEach(() => {
      authAPI = new AuthService()
      authStore = new AuthStore(authAPI)
   })

   it('should test initialising auth store', () => {
      expect(authStore.getUserSignInAPIStatus).toBe(API_INITIAL)
      expect(authStore.getUserSignInAPIError).toBe(null)
   })

   it('should test userSignInAPI data fetching state', () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      const requestObject = {
         username: 'test-user',
         password: 'test-password'
      }

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockLoadingPromise)
      authAPI.signInApi = authStore.userSignIn(
         requestObject,
         onSuccess,
         onFailure
      )
      expect(authStore.getUserSignInAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test the userSignInAPI success state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      const requestObject = {
         username: 'test-user',
         password: 'test-password'
      }

      const mockSuccessPromise = Promise.resolve(getUserSignInFixture)

      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockSuccessPromise)
      authAPI.signInApi = mockSignInAPI

      await authStore.userSignIn(requestObject, onSuccess, onFailure)
      expect(authStore.getUserSignInAPIStatus).toBe(API_SUCCESS)
      expect(mockSetCookie).toBeCalled()
      expect(onSuccess).toBeCalled()
   })

   it('should test userSignInAPI failure state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const requestObject = {
         username: 'test-user',
         password: 'test-password'
      }

      jest
         .spyOn(authAPI, 'signInApi')
         .mockImplementation(() => Promise.reject())

      await authStore.userSignIn(requestObject, onSuccess, onFailure)
      expect(authStore.getUserSignInAPIStatus).toBe(API_FAILED)
      expect(onFailure).toBeCalled()
   })

   it('should test user sign-out', () => {
      authStore.userSignOut()
      expect(mockRemoveCookie).toBeCalled()
      expect(authStore.getUserSignInAPIStatus).toBe(API_INITIAL)
      expect(authStore.getUserSignInAPIError).toBe(null)
   })
})
