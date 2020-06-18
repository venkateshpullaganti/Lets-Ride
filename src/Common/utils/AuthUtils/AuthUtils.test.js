import React from 'react'

import { clearUserSession, setAccessToken } from '../StorageUtils'

import { isLoggedIn } from './AuthUtils'

describe('Should test the AuthUtils', () => {
   beforeEach(() => {
      jest.resetAllMocks()
   })
   it('should test the isLoggedIn function', () => {
      clearUserSession()
      expect(isLoggedIn()).toBeFalsy()
   })
   it('should test the isLoggedIn function', () => {
      setAccessToken('Sample token')
      expect(isLoggedIn()).toBeTruthy()
   })
})
