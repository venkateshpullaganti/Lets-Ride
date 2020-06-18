import Cookie from 'js-cookie'

import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import { AuthService } from '../../services/AuthService'
import getUserSignInFixture from '../../fixtures/getUserSignInFixture.json'
import getUserProfileFIxture from '../../fixtures/getUserProfileFIxture.json'

import { AuthStore } from '.'
import { waitFor } from '@testing-library/react'

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
      expect(authStore.getUserProfileAPIStatus).toBe(API_INITIAL)
      expect(authStore.getUserProfileAPIError).toBe(null)
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

   it('should test getUserProfileAPI data fetching state', () => {
      const requestObject = {
         username: 'test-user',
         password: 'test-password'
      }

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockUserProfileAPI = jest.fn()

      mockUserProfileAPI.mockReturnValue(mockLoadingPromise)
      authAPI.userProfileApi = mockUserProfileAPI

      authStore.getUserProfile(requestObject)

      expect(authStore.getUserProfileAPIStatus).toBe(API_FETCHING)
   })
   it('should test getUserProfileAPI  success state', async () => {
      const requestObject = {
         username: 'test-user',
         password: 'test-password'
      }

      const mockSuccessPromise = new Promise(resolve =>
         resolve(getUserProfileFIxture)
      )

      const mockUserProfileAPI = jest.fn()

      mockUserProfileAPI.mockReturnValue(mockSuccessPromise)
      authAPI.userProfileApi = mockUserProfileAPI

      authStore.getUserProfile(requestObject)

      await waitFor(() => {
         expect(authStore.getUserProfileAPIStatus).toBe(API_SUCCESS)
      })
   })
   it('should test getUserProfileAPI  failure state', async () => {
      const requestObject = {
         username: 'test-user',
         password: 'test-password'
      }

      const mockFailurePromise = new Promise((resolve, reject) => reject())

      const mockUserProfileAPI = jest.fn()

      mockUserProfileAPI.mockReturnValue(mockFailurePromise)
      authAPI.userProfileApi = mockUserProfileAPI

      authStore.getUserProfile(requestObject)

      await waitFor(() => {
         expect(authStore.getUserProfileAPIStatus).toBe(API_FAILED)
      })
   })

   it('should test user sign-out', () => {
      const mockInit = jest.fn()
      authStore.init = mockInit
      authStore.userSignOut()
      expect(mockRemoveCookie).toBeCalled()
      expect(mockInit).toBeCalled()
   })
})
