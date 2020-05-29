import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import strings from '../../i18n/strings.json'

import { ShareRideForm } from '.'

describe('Sign in form tests', () => {
   it('should render given source place', () => {
      let expectedOutput = 'krnl'
      const { getByLabelText } = render(
         <Router history={createMemoryHistory()}>
            <ShareRideForm
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
            <ShareRideForm
               destinationPlace={expectedOutput}
               onChangePassword={() => {}}
            />
         </Router>
      )
      const actualOutput = getByLabelText(strings.toText).value
      expect(actualOutput).toBe(expectedOutput)
   })

   it('should render the sourcePlace error', () => {
      const { getByText } = render(
         <Router history={createMemoryHistory()}>
            <ShareRideForm
               isSourceError={true}
               errorMsg={strings.sourcePlaceError}
               onChangeSource={() => {}}
            />
         </Router>
      )
      const shareBtn = getByText('SHARE')
      fireEvent.click(shareBtn)
      getByText(strings.sourcePlaceError)
   })
   it('should render destination place empty error message', () => {
      const { getByText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <ShareRideForm sourcePlace={'source'} onChange={() => {}} />
         </Router>
      )

      const shareBtn = getByText('SHARE')

      fireEvent.click(shareBtn)

      getByText(/source/i)
      getByText(strings.destinationPlaceError)
   })
})
