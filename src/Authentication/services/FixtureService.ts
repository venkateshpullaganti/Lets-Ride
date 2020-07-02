import getUserSignInFixture from '../fixtures/getUserSignInFixture.json'
import getUserProfileFIxture from '../fixtures/getUserProfileFIxture.json'

class FixtureService {
   signInApi = requestObject => {
      return new Promise(resolve => {
         setTimeout(() => {
            resolve(getUserSignInFixture)
         }, 1000)
      })
   }
   userProfileApi = () => {
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve(getUserProfileFIxture)
         }, 1000)
      })
   }
}
export { FixtureService }
