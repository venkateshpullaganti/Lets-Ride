import React from 'react'
import Select from 'react-select'

import { Label, Required, Error } from '../Input/styledComponents'

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
   return (
      <>
         <Label className='mt-6' htmlFor={label}>
            {label}
            <Required>{isRequired ? '*' : null}</Required>
         </Label>
         <Select
            id={label}
            // styles={customStyles}
            className={
               isError
                  ? `selector-styles border border-red-500 border-solid rounded`
                  : `selector-styles rounded`
            }
            onChange={onChange}
            options={options}
            placeholder={placeholder}
            selectedValue={options.filter(opt => opt.value === value)}
         />
         <Error>{isError ? 'Required' : null}</Error>
      </>
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
