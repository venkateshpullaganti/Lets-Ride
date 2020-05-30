import { create } from 'apisauce'

import { apiMethods } from '../../Common/constants/APIConstants'

import getUserSignInFixture from '../fixtures/getUserSignInFixture.json'

class FixtureService {
   api
   constructor() {
      this.api = create({
         baseURL: 'https://5ea1a14db9f5ca00166c1f27.mockapi.io/api/lets_ride/'
      })
   }
   signInAPI = requestObject => {
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve(getUserSignInFixture)
         }, 1000)
      })
   }
}
export { FixtureService }
