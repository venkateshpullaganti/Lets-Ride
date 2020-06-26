import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import strings from '../../i18n/strings.json'

import { AssetTransportRequestForm } from '.'

describe('Asset Transport Request form tests', () => {
   beforeEach(() => {
      jest.resetAllMocks()
   })

   it('should render the source Place error', () => {
      const { getByText, getByRole, debug } = render(
         <AssetTransportRequestForm onSubmit={() => {}} apiStatus={0} />
      )
      const submitBtn = getByRole('button', { name: 'REQUEST' })
      fireEvent.click(submitBtn)
      getByText('SOURCE PLACE REQUIRED')
      debug()
   })
   it('should render the destination place error', () => {
      const sourcePlace = 'kurnool'

      const { getByText, getByRole, getByLabelText } = render(
         <AssetTransportRequestForm onSubmit={() => {}} apiStatus={0} />
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
         <AssetTransportRequestForm onSubmit={() => {}} apiStatus={0} />
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
   it('should render no.of assets error', () => {
      const sourcePlace = 'kurnool'
      const destinationPlace = 'Hyd'
      const dateAndTime = new Date()

      const {
         getByText,
         getByRole,
         getByLabelText,
         getAllByPlaceholderText
      } = render(
         <AssetTransportRequestForm onSubmit={() => {}} apiStatus={0} />
      )
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
      getByText('Alteast 1 Required')
   })
   it('should render flexible date and time error', () => {
      const sourcePlace = 'kurnool'
      const destinationPlace = 'Hyd'

      const { getAllByText, getByRole, getByLabelText } = render(
         <AssetTransportRequestForm onSubmit={() => {}} apiStatus={0} />
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
   it('should test the asset quantity counter', () => {
      const assetQuantity = 10
      const { getByLabelText, getByRole } = render(
         <AssetTransportRequestForm onSubmit={() => {}} apiStatus={0} />
      )
      const assetQuantityField = getByLabelText(
         'NO OF ASSETS'
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
})
