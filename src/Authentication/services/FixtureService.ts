import { create } from 'apisauce'

import getUserSignInFixture from '../fixtures/getUserSignInFixture.json'
import getUserProfileFIxture from '../fixtures/getUserProfileFIxture.json'

class FixtureService {
   api
   constructor() {
      this.api = create({
         baseURL: 'https://5ea1a14db9f5ca00166c1f27.mockapi.io/api/lets_ride/'
      })
   }
   signInApi = requestObject => {
      return new Promise(resolve => {
         setTimeout(() => {
            resolve(getUserSignInFixture)
         }, 1000)
      })
   }
   userProfileApi = requestObject => {
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve(getUserProfileFIxture)
         }, 1000)
      })
   }
}
export { FixtureService }
