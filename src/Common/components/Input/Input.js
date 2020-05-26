import React, { Component } from 'react'

import {
   CustomInput,
   CustomLabel,
   Error,
   ErrorIcon,
   InputContainer
} from './styledComponents'

class Input extends Component {
   render() {
      const {
         type,
         id,
         onChangeInput,
         labelText,
         errorMsg,
         isError,
         placeholder
      } = this.props

      return (
         <InputContainer>
            <CustomLabel for={id}>{labelText}</CustomLabel>
            {isError ? (
               <ErrorIcon
                  src={
                     'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/6157cd12-2279-47dc-b3a6-68f6793f2c2b.svg'
                  }
               />
            ) : null}
            <CustomInput
               type={type}
               id={id}
               placeholder={placeholder}
               onChange={onChangeInput}
               isError={isError}
            />

            <Error>{isError ? errorMsg : ''}</Error>
         </InputContainer>
      )
   }
}

export { Input }
