import React from 'react'
import { UserProfileAPIResponse } from '../../types'

class UserProfileModel {
   userName: string | null
   phoneNumber: string | null
   profileImage: string | null

   constructor(profileObj: UserProfileAPIResponse) {
      this.userName = profileObj.username
      this.phoneNumber = profileObj.phone_number
      this.profileImage = profileObj.profile_pic_url
   }
}
export default UserProfileModel
