import React, { Component } from 'react'

import { ValidationReturnObj } from '../../utils/ValidationUtils'

import { Wrapper, Label, Input } from './styledComponents'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

interface TextInputProps {
   type: string
   label: string
   className: string
   value: string
   onChange?: (value: string) => void
   validationFunction: (value: string) => ValidationReturnObj
   onBlur: (value: string) => void
}

@observer
class TextInput extends Component<TextInputProps> {
   @observable shouldShowError: boolean
   errorMessage: string
   @observable value: string

   static defaultProps = {}

   constructor(props: TextInputProps) {
      super(props)
      this.shouldShowError = false
      this.errorMessage = ''
      this.value = ''
   }

   get isNoError() {
      return !this.shouldShowError
   }

   onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      const { label, className, value, type } = this.props
      return (
         <Wrapper className={className} isError={this.shouldShowError}>
            <Label>{label}</Label>
            <Input
               value={value}
               onChange={this.onChange}
               onBlur={this.onBlur}
               type={type}
            />
         </Wrapper>
      )
   }
}
export { TextInput }
