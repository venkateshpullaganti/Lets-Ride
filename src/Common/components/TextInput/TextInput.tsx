import React, { Component } from 'react'

import { ValidationReturnObj } from '../../utils/ValidationUtils'

import { Wrapper, Label, Input, Error } from './styledComponents'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

interface TextInputProps {
   type: string
   placeholder: string
   label: string
   className: string
   value: string
   onChange: (value: string) => void
   validationFunction: (value: string) => ValidationReturnObj
   onBlur: (value: string) => void
}

@observer
class TextInput extends Component<TextInputProps> {
   @observable shouldShowError: boolean
   @observable value: string

   errorMessage: string

   static defaultProps = {
      placeholder: '',
      value: '',
      className: '',
      onChange: null
   }

   constructor(props: TextInputProps) {
      super(props)
      this.shouldShowError = false
      this.errorMessage = ''
      this.value = ''
   }

   get isNoError() {
      return !this.shouldShowError
   }

   onChange = (event: { target: { value: string } }) => {
      this.value = event.target.value
      const { onChange } = this.props
      if (onChange) onChange(event.target.value)
   }

   onBlur = () => {
      const { onBlur, validationFunction } = this.props
      const { shouldShowError, errorMessage } = validationFunction(this.value)
      this.shouldShowError = shouldShowError
      this.errorMessage = errorMessage
      if (this.isNoError) onBlur(this.value)
   }
   render() {
      const { label, className, value, type, placeholder } = this.props
      return (
         <Wrapper className={className}>
            <Label>{label}</Label>
            <Input
               value={this.value}
               onChange={this.onChange}
               onBlur={this.onBlur}
               type={type}
               placeholder={placeholder}
               isError={this.shouldShowError}
            />
            <Error>{this.errorMessage ? this.errorMessage : null}</Error>
         </Wrapper>
      )
   }
}
export { TextInput }
