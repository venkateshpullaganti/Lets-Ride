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
   position: 'bottom-center'
})

export const displayToaster = (
   msg: string | null,
   isFailure: boolean,
   error?: Error | null
) => {
   if (isFailure) {
      toast.error(getUserDisplayableErrorMessage(error))
   } else {
      toast.success(msg || 'Success')
   }
}
