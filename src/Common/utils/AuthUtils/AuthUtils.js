import { getAccessToken } from '../StorageUtils'

export const isLoggedIn = () => {
   const token = getAccessToken()
   if (token === '' || token === undefined) return false
   return true
}
