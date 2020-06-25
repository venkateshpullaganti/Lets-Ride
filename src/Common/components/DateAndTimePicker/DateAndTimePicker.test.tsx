import React from 'react'
import { render } from '@testing-library/react'

import { DateAndTimePicker } from '.'

describe('Should Test date and time picker', () => {
   it('should test the rendered date and time picker', () => {
      const label = 'Date Picker'
      const { getByPlaceholderText } = render(
         <DateAndTimePicker labelText={label} isRequired={false} />
      )
      getByPlaceholderText('Select Date and Time')
   })
})
