import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { moment } from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import { DateInput, Label, Error, Required } from './styledComponents'

function DateAndTimePicker(props) {
   const { isError, errorMsg, isRequired, onChange } = props
   const [startDate, setStartDate] = useState(null)

   // const Input = () => <input onClick={onChange} className='w-64 h-8' />

   return (
      <DateInput shouldShow={isRequired}>
         <Label>
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
export { DateAndTimePicker }
