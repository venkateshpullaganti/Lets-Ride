import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { Input } from '.'

describe('Should test the input', () => {
   it('should render the given input', () => {
      const value = 'Sample-input'
      const placeholder = 'Enter-text'
      const mockOnChange = jest.fn()
      const { getByDisplayValue, getByPlaceholderText } = render(
         <Input
            value={''}
            placeholder={placeholder}
            type={'text'}
            onChange={mockOnChange}
         />
      )
      const input = getByPlaceholderText(placeholder)

      fireEvent.change(input, { target: { value: value } })

      expect(mockOnChange).toBeCalled()
      getByDisplayValue(value)
   })
})
