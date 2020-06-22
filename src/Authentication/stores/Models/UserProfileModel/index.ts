import React from 'react'

type profileObj = {
   username: string
   phone_number: string
   profile_pic_url: string
}

class UserProfileModel {
   userName: string | null
   phoneNumber: string | null
   profileImage: string | null

   constructor(profileObj: profileObj) {
      this.userName = profileObj.username
      this.phoneNumber = profileObj.phone_number
      this.profileImage = profileObj.profile_pic_url
   }
}
export default UserProfileModel
