import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { DateInput, Label, Picker } from './styledComponents'

function DateAndTimePicker(props) {
   return (
      <DateInput>
         <Label htmlfor={'datePicker'}>{props.labelText}</Label>
         <DatePicker
            className={'border border-gray-500 border-solid rounded mx-2 '}
            id={'datePicker'}
            selected={props.date}
            onChange={props.onChange}
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={15}
            timeCaption='time'
            dateFormat='dd/MM/yyyy h:mm aa'
         />
      </DateInput>
   )
}
export { DateAndTimePicker }
