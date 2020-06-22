import React from 'react'
import Select from 'react-select'

import { Label, Required, Error, Container } from '../Input/styledComponents'

export function Selector(props) {
   const {
      options,
      label,
      placeholder,
      value,
      onChange,
      isRequired,
      isError,
      errorMsg
   } = props
   console.log(options)
   return (
      <Container data-testid={'react-selector'}>
         <Label className='mt-6' htmlFor={label}>
            {label}
            <Required>{isRequired ? '*' : null}</Required>
         </Label>
         <Select
            key={label}
            id={label}
            className={
               isError
                  ? `selector-styles border border-red-500 border-solid `
                  : `selector-styles`
            }
            onChange={onChange}
            options={options}
            placeholder={placeholder}
         />
         <Error>{isError ? 'Required' : null}</Error>
      </Container>
   )
}

const customStyles = {
   option: (provided, state) => ({
      ...provided,
      border: '1px solid transparent'
   }),
   control: () => ({
      // none of react-select's styles are passed to <Control />
      border: '1px solid transparent',
      width: 200
   }),
   singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1
      const transition = 'opacity 300ms'

      return { ...provided, opacity, transition }
   }
}
