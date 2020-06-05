import React from 'react'

import { toast, Slide } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import { getUserDisplayableErrorMessage } from '../../Common/utils/APIUtils'

toast.configure({
   autoClose: 2500,
   draggable: true,
   hideProgressBar: true,
   pauseOnHover: false,
   closeButton: false,
   transition: Slide,
   position: toast.POSITION.BOTTOM_CENTER
})

export const displayToaster = (isFailure, msg, error) => {
   let message = msg

   if (isFailure) {
      message = getUserDisplayableErrorMessage(error)
      toast.error(message)
   } else {
      toast.success(message ?? 'Error occured. Try again later.')
   }
}
