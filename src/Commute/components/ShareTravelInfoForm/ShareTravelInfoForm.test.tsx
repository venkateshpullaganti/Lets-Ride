import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import strings from '../../i18n/strings.json'

import { ShareTravelInfoForm } from '.'
import { API_INITIAL } from '@ib/api-constants'

describe('Share travel info SHARE form tests', () => {
   beforeEach(() => {
      jest.resetAllMocks()
   })

   it('should render the source Place error', () => {
      const { getByText, getByRole } = render(
         <ShareTravelInfoForm onSubmit={jest.fn} apiStatus={API_INITIAL} />
      )
      const submitBtn = getByRole('button', { name: 'SHARE' })
      fireEvent.click(submitBtn)
      getByText('SOURCE PLACE REQUIRED')
   })
   it('should render the destination place error', () => {
      const sourcePlace = 'kurnool'

      const { getByText, getByRole, getByLabelText } = render(
         <ShareTravelInfoForm onSubmit={jest.fn} apiStatus={API_INITIAL} />
      )
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

      const { getByText, getByRole, getByLabelText, debug } = render(
         <ShareTravelInfoForm onSubmit={jest.fn} apiStatus={API_INITIAL} />
      )
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
   it('should render flexible date and time error', () => {
      const sourcePlace = 'kurnool'
      const destinationPlace = 'Hyd'

      const { getAllByText, getByRole, getByLabelText } = render(
         <ShareTravelInfoForm onSubmit={jest.fn} apiStatus={API_INITIAL} />
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
   it('should test asset quantity counter', () => {
      const assetQuantity = 10
      const { getByLabelText, getByRole } = render(
         <ShareTravelInfoForm onSubmit={jest.fn} apiStatus={API_INITIAL} />
      )
      const assetQuantityField = getByLabelText(
         'ASSETS QUANTITY*'
      ) as HTMLInputElement
      fireEvent.change(assetQuantityField, {
         target: { value: assetQuantity }
      })
      expect(assetQuantityField.value).toBe(assetQuantity.toString())

      const incrementBtn = getByRole('button', { name: '+' })
      const decrementBtn = getByRole('button', { name: '-' })

      fireEvent.click(incrementBtn)
      expect(assetQuantityField.value).toBe('11')

      fireEvent.click(decrementBtn)
      fireEvent.click(decrementBtn)
      expect(assetQuantityField.value).toBe('9')
   })

   it('should render travelMedium error', () => {
      const sourcePlace = 'kurnool'
      const destinationPlace = 'Hyd'
      const dateAndTime = new Date()

      const {
         getByText,
         getByRole,
         getByLabelText,
         getAllByPlaceholderText
      } = render(
         <ShareTravelInfoForm onSubmit={jest.fn} apiStatus={API_INITIAL} />
      )
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
      getByText('Required')
   })
   it('should render AssetQuantity error', async () => {
      const sourcePlace = 'kurnool'
      const destinationPlace = 'Hyd'
      const dateAndTime = new Date()

      const {
         getByText,
         getByRole,
         getByLabelText,
         getAllByPlaceholderText,
         getByTestId,
         debug
      } = render(
         <ShareTravelInfoForm onSubmit={jest.fn} apiStatus={API_INITIAL} />
      )
      const submitBtn = getByRole('button', { name: 'SHARE' })

      const sourcePlaceField = getByLabelText(strings.fromText)
      const destinationField = getByLabelText(strings.toText)
      const dateAndTimeFields = getAllByPlaceholderText('Select Date and Time')
      const travelMediumField = getByTestId('TRAVEL MEDIUM') as H

      fireEvent.change(sourcePlaceField, {
         target: { value: sourcePlace }
      })
      fireEvent.change(destinationField, {
         target: { value: destinationPlace }
      })
      fireEvent.change(dateAndTimeFields[0], {
         target: { value: dateAndTime }
      })

      fireEvent.keyDown(travelMediumField.firstChild, { key: 'ArrowDown' })

      await waitFor(() => getByText('BUS'))
      fireEvent.click(getByText('BUS'))
      fireEvent.click(submitBtn)
      getByText('Alteast 1 Required')
   })
})
