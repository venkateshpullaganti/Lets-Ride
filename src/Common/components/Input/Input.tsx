import React, { Component } from 'react'

import images from '../../themes/Images'

import {
   CustomInput,
   Label,
   Error,
   ErrorIcon,
   InputContainer,
   Required,
   LabelContainer
} from './styledComponents'

interface InputProps {
   type: string
   id: string
   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
   labelText: string
   errorMsg: string | null
   isError: boolean
   placeholder: string
   value: string
   isRequired: boolean
   shouldShow: boolean
}

class Input extends Component<InputProps> {
   static defaultProps = {
      type: 'text',
      id: '21',
      shouldShow: true,
      labelText: 'Enter Text',
      errorMsg: 'input error',
      isError: false,
      placeholder: '',
      isRequired: false
   }
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

export { Input }
