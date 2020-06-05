import React from 'react'
import { toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { getUserDisplayableErrorMessage } from '../../../Common/utils/APIUtils'

toast.configure({
   autoClose: 2500,
   draggable: true,
   hideProgressBar: true,
   pauseOnHover: false,
   closeButton: false,
   transition: Slide,
   position: toast.POSITION.BOTTOM_CENTER
})

export const displayToaster = (msg, isFailure, error) => {
   if (isFailure) {
      toast.error(getUserDisplayableErrorMessage(error))
   } else {
      toast.success(msg ?? 'Error occured. Try again later.')
   }
}
