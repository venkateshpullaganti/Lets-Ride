import React from 'react'
import Select from 'react-select'

import { Label, Required, Error } from '../Input/styledComponents'
import { OptionType, OptionsType } from '../../../Commute/components/types'

interface SelectorProps {
   options: OptionsType
   label: string
   placeholder: string | null
   value: any
   onChange: (selected: OptionType) => void
   isRequired: boolean
   isError: boolean
   errorMsg: string | null
}

export function Selector(props: SelectorProps) {
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
         <div data-testid={label}>
            <Select
               key={label}
               className={
                  isError
                     ? `selector-styles border border-red-500 border-solid rounded`
                     : `selector-styles rounded`
               }
               onChange={onChange}
               options={options}
               placeholder={placeholder}
            />
         </div>
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
