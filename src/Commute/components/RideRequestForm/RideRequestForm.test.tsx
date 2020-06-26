import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import strings from '../../i18n/strings.json'

import { RideRequestForm } from '.'
import { API_INITIAL } from '@ib/api-constants'

describe('Ride Request form tests', () => {
   beforeEach(() => {
      jest.resetAllMocks()
   })

   it('should render given source place', () => {
      let expectedOutput = 'krnl'
      const { getByLabelText, debug } = render(
         <RideRequestForm onSubmit={jest.fn} apiStatus={API_INITIAL} />
      )
      const sourcePlaceField = getByLabelText(
         strings.fromText
      ) as HTMLInputElement
      fireEvent.change(sourcePlaceField, {
         target: { value: expectedOutput }
      })
      expect(sourcePlaceField.value).toBe(expectedOutput)
   })

   it('should render the given destinationPlace', () => {
      let expectedOutput = 'tester-destinationPlace'
      const { getByLabelText } = render(
         <RideRequestForm onSubmit={jest.fn} apiStatus={API_INITIAL} />
      )

      const destinationField = getByLabelText(
         strings.toText
      ) as HTMLInputElement

      expect(destinationField.value).toBe(expectedOutput)
   })

   it('should render the source Place error', () => {
      const { getByText, getByRole } = render(
         <RideRequestForm onSubmit={jest.fn} apiStatus={API_INITIAL} />
      )
      const submitBtn = getByRole('button', { name: 'REQUEST' })
      fireEvent.click(submitBtn)
      getByText('SOURCE PLACE REQUIRED')
   })
   it('should render the destination place error', () => {
      const sourcePlace = 'kurnool'

      const { getByText, getByRole, getByLabelText } = render(
         <RideRequestForm onSubmit={jest.fn} apiStatus={API_INITIAL} />
      )
      const submitBtn = getByRole('button', { name: 'REQUEST' })

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

      const { getByText, getByRole, getByLabelText } = render(
         <RideRequestForm onSubmit={jest.fn} apiStatus={API_INITIAL} />
      )
      const submitBtn = getByRole('button', { name: 'REQUEST' })

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
      } = render(<RideRequestForm onSubmit={jest.fn} apiStatus={API_INITIAL} />)
      const submitBtn = getByRole('button', { name: 'REQUEST' })

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
         <RideRequestForm onSubmit={jest.fn} apiStatus={API_INITIAL} />
      )
      const submitBtn = getByRole('button', { name: 'REQUEST' })

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
   it('should  test the  laguage quantity counter', () => {
      const laguageQuantity = 5
      const { getByLabelText, getAllByRole } = render(
         <RideRequestForm onSubmit={jest.fn} apiStatus={API_INITIAL} />
      )
      const laguageQuantityField = getByLabelText(
         'LUGGAGE QUANTITY'
      ) as HTMLInputElement
      fireEvent.change(laguageQuantityField, {
         target: { value: laguageQuantity }
      })
      expect(laguageQuantityField.value).toBe(laguageQuantity.toString())
      const incrementBtns = getAllByRole('button', { name: '+' })
      const decrementBtns = getAllByRole('button', { name: '-' })

      fireEvent.click(incrementBtns[1])
      fireEvent.click(incrementBtns[1])
      expect(laguageQuantityField.value).toBe('7')

      fireEvent.click(decrementBtns[1])
      fireEvent.click(decrementBtns[1])
      expect(laguageQuantityField.value).toBe('5')
   })
   it('should  test the  no.of seats counter', () => {
      const seatCount = 3
      const { getByLabelText, getAllByRole } = render(
         <RideRequestForm onSubmit={jest.fn} apiStatus={API_INITIAL} />
      )
      const seatCountField = getByLabelText('NO.OF SEATS*') as HTMLInputElement
      fireEvent.change(seatCountField, {
         target: { value: seatCount }
      })
      expect(seatCountField.value).toBe(seatCount.toString())

      const incrementBtns = getAllByRole('button', { name: '+' })
      const decrementBtns = getAllByRole('button', { name: '-' })

      fireEvent.click(incrementBtns[0])
      expect(seatCountField.value).toBe('4')

      fireEvent.click(decrementBtns[0])
      fireEvent.click(decrementBtns[0])
      expect(seatCountField.value).toBe('2')
   })
})
