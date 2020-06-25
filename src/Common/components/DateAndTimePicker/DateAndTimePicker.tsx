import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { DateInput, Label, Error, Required } from './styledComponents'

interface DateAndTimePickerProps {
   onChange: (date: Date) => void
   labelText: string
   isError: boolean
   errorMsg: string | null
   isRequired: boolean
}

function DateAndTimePicker(props: DateAndTimePickerProps) {
   const { isError, errorMsg, isRequired, onChange } = props
   const [startDate, setStartDate] = useState(null)

   return (
      <DateInput shouldShow={isRequired}>
         <Label htmlFor='datePicker'>
            {props.labelText} <Required isRequired={isRequired}>*</Required>
         </Label>

         <DatePicker
            className={
               isError
                  ? 'border border-red-500  border-solid rounded w-48 h-10 pl-3'
                  : 'border border-gray-500 border-solid rounded w-48 h-10 pl-3'
            }
            placeholderText={'Select Date and Time'}
            id={'datePicker'}
            selected={startDate}
            onChange={date => {
               setStartDate(date)
               onChange(date)
            }}
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={15}
            timeCaption='TIME'
            dateFormat='dd/MM/yyyy h:mm aa'
            minDate={new Date()}
         />
         <Error isError={isError}> {isError ? errorMsg : null}</Error>
      </DateInput>
   )
}
// DateAndTimePicker.defaultProps{
//    shouldShow:true
// }
export { DateAndTimePicker }
