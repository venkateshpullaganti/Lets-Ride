import React from 'react'
import Select from 'react-select'

import { Label } from '../Input/styledComponents'

export function Selector(props) {
   const { options, label, placeholder, value, onChange } = props
   return (
      <>
         <Label className='mt-6' htmlFor={label}>
            {label}
         </Label>
         <Select
            id={label}
            value={value}
            className='selector-styles'
            onChange={onChange}
            options={options}
            placeholder={placeholder}
         />
      </>
   )
}

const customStyles = {
   option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      padding: 20
   }),
   control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 200
   }),
   singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1
      const transition = 'opacity 300ms'

      return { ...provided, opacity, transition }
   }
}
