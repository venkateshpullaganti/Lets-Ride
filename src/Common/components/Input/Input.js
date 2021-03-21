import React, { Component } from 'react'

import images from '../../themes/images'

import {
   CustomInput,
   Label,
   Error,
   ErrorIcon,
   InputContainer,
   Required,
   LabelContainer
} from './styledComponents'

class Input extends Component {
   render() {
      const {
         type,
         id,
         onChange,
         labelText,
         errorMsg,
         isError,
         placeholder,
         value,
         isRequired,
         shouldShow
      } = this.props

      return (
         <InputContainer shouldShow={shouldShow}>
            <LabelContainer>
               <Label htmlFor={id}>{labelText}</Label>
               <Required>{isRequired ? '*' : null}</Required>
            </LabelContainer>
            {isError ? <ErrorIcon src={images.errorIcon} /> : null}
            <CustomInput
               onChange={onChange}
               type={type}
               id={id}
               placeholder={placeholder}
               isError={isError}
               value={value}
            />

            <Error>{isError ? errorMsg : null}</Error>
         </InputContainer>
      )
   }
}
Input.defaultProps = {
   type: 'text',
   id: '21',
   shouldShow: true,
   labelText: 'Enter Text',
   errorMsg: 'input error',
   isError: false
}

export { Input }
