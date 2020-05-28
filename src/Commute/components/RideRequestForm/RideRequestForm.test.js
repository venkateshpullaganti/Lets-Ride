import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'

import { createMemoryHistory } from 'history'

import strings from '../../i18n/strings.json'

import { RideRequestForm } from '.'

describe('Sign in form tests', () => {
   it('should render given source place', () => {
      let expectedOutput = 'krnl'
      const { getByLabelText } = render(
         <Router history={createMemoryHistory()}>
            <RideRequestForm
               sourcePlace={expectedOutput}
               onChangeUserName={() => {}}
               isSourceError={false}
            />
         </Router>
      )
      const sourcePlaceField = getByLabelText(strings.fromText)

      expect(sourcePlaceField.value).toBe(expectedOutput)
   })

   it('should render the given destinationPlace', () => {
      let expectedOutput = 'tester-destinationPlace'
      const { getByLabelText } = render(
         <Router history={createMemoryHistory()}>
            <RideRequestForm
               destinationPlace={expectedOutput}
               onChangePassword={() => {}}
            />
         </Router>
      )
      const actualOutput = getByLabelText(strings.toText).value
      expect(actualOutput).toBe(expectedOutput)
   })

   it('should render the sourcePlace error', () => {
      const { getByText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <RideRequestForm
               isSourceError={true}
               errorMsg={strings.sourcePlaceError}
               onChangeSource={() => {}}
            />
         </Router>
      )
      const requestBtn = getByRole('button', { name: strings.requestBtnText })
      fireEvent.click(requestBtn)
      getByText(strings.sourcePlaceError)
   })
   //    it('should render destination place empty error message', () => {
   //       const { getByText, getByRole } = render(
   //          <Router history={createMemoryHistory()}>
   //             <RideRequestForm sourcePlace={'source'} onChange={() => {}} />
   //          </Router>
   //       )

   //       const requestBtn = getByRole('button', { name: strings.requestBtnText })

   //       fireEvent.click(requestBtn)

   //       getByText(/source/i)
   //       getByText(strings.destinationPlaceError)
   //    })
})
