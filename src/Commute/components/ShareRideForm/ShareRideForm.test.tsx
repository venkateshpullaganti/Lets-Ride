import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import strings from '../../i18n/strings.json'

import { ShareRideForm } from '.'

describe('share Ride form tests', () => {
   beforeEach(() => {
      jest.resetAllMocks()
   })

   it('should render the source Place error', () => {
      const { getByText, getByRole } = render(<ShareRideForm />)
      const submitBtn = getByRole('button', { name: 'SHARE' })
      fireEvent.click(submitBtn)
      getByText('SOURCE PLACE REQUIRED')
   })
   it('should render the destination place error', () => {
      const sourcePlace = 'kurnool'

      const { getByText, getByRole, getByLabelText } = render(<ShareRideForm />)
      const submitBtn = getByRole('button', { name: 'SHARE' })

      const sourcePlaceField = getByLabelText(strings.fromText)

      fireEvent.change(sourcePlaceField, {
         target: { value: sourcePlace }
      })

      fireEvent.click(submitBtn)
      getByText('DESTINATION PLACE REQUIRED')
   })
   it('should render the date and time error', () => {
      const sourcePlace = 'kurnool'
      const destinationPlace = 'Hyd'

      const { getByText, getByRole, getByLabelText } = render(<ShareRideForm />)
      const submitBtn = getByRole('button', { name: 'SHARE' })

      const sourcePlaceField = getByLabelText(strings.fromText)
      const destinationField = getByLabelText(strings.toText)

      fireEvent.change(sourcePlaceField, {
         target: { value: sourcePlace }
      })
      fireEvent.change(destinationField, {
         target: { value: destinationPlace }
      })

      fireEvent.click(submitBtn)
      getByText('Required')
   })
   it('should render no.of seats error', () => {
      const sourcePlace = 'kurnool'
      const destinationPlace = 'Hyd'
      const dateAndTime = new Date()

      const {
         getByText,
         getByRole,
         getByLabelText,
         getAllByPlaceholderText
      } = render(<ShareRideForm />)
      const submitBtn = getByRole('button', { name: 'SHARE' })

      const sourcePlaceField = getByLabelText(strings.fromText)
      const destinationField = getByLabelText(strings.toText)
      const dateAndTimeFields = getAllByPlaceholderText('Select Date and Time')

      fireEvent.change(sourcePlaceField, {
         target: { value: sourcePlace }
      })
      fireEvent.change(destinationField, {
         target: { value: destinationPlace }
      })
      fireEvent.change(dateAndTimeFields[0], {
         target: { value: dateAndTime }
      })

      fireEvent.click(submitBtn)
      getByText('Required Seats')
   })
   it('should render flexible date and time error', () => {
      const sourcePlace = 'kurnool'
      const destinationPlace = 'Hyd'

      const { getAllByText, getByRole, getByLabelText } = render(
         <ShareRideForm />
      )
      const submitBtn = getByRole('button', { name: 'SHARE' })

      const sourcePlaceField = getByLabelText(strings.fromText)
      const destinationField = getByLabelText(strings.toText)
      const flexibleTimingsCheckbox = getByLabelText('Flexible Timings')

      fireEvent.change(sourcePlaceField, {
         target: { value: sourcePlace }
      })
      fireEvent.change(destinationField, {
         target: { value: destinationPlace }
      })
      fireEvent.click(flexibleTimingsCheckbox)

      fireEvent.click(submitBtn)
      getAllByText('Required.')
   })
   it('should test render the no.of seats', () => {
      const seatCount = 2
      const { getByLabelText, getAllByRole } = render(<ShareRideForm />)
      const seatCountField = getByLabelText('NO.OF SEATS')
      fireEvent.change(seatCountField, {
         target: { value: seatCount }
      })
      expect(seatCountField.value).toBe(seatCount.toString())

      const incrementBtns = getAllByRole('button', { name: '+' })
      const decrementBtns = getAllByRole('button', { name: '-' })

      fireEvent.click(incrementBtns[0])
      fireEvent.click(incrementBtns[0])
      expect(seatCountField.value).toBe('4')

      fireEvent.click(decrementBtns[0])
      expect(seatCountField.value).toBe('3')
   })
   it('should test render the laguage quantity', () => {
      const laguageQuantity = 8
      const { getByLabelText, getAllByRole } = render(<ShareRideForm />)
      const laguageQuantityField = getByLabelText('LUGGAGE QUANTITY')
      fireEvent.change(laguageQuantityField, {
         target: { value: laguageQuantity }
      })
      expect(laguageQuantityField.value).toBe(laguageQuantity.toString())
      const incrementBtns = getAllByRole('button', { name: '+' })
      const decrementBtns = getAllByRole('button', { name: '-' })

      fireEvent.click(incrementBtns[1])
      fireEvent.click(incrementBtns[1])
      expect(laguageQuantityField.value).toBe('10')

      fireEvent.click(decrementBtns[1])
      fireEvent.click(decrementBtns[1])
      fireEvent.click(decrementBtns[1])
      expect(laguageQuantityField.value).toBe('7')
   })
})
