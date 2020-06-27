export interface ValidationReturnObj {
   shouldShowError: boolean
   errorMessage: string
}
function emptysourcePlace(): ValidationReturnObj {
   return {
      shouldShowError: true,
      errorMessage: 'Invalid Input'
   }
}

function sourcePlaceValidation(place: string): ValidationReturnObj {
   if (place === null) {
      return emptysourcePlace()
   } else if (place.length < 3)
      return {
         shouldShowError: true,
         errorMessage: 'Please enter Username'
      }
   return {
      shouldShowError: false,
      errorMessage: ''
   }
}

export { sourcePlaceValidation }
