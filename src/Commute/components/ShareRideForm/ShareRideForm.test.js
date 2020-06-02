import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import strings from '../../i18n/strings.json'

import { ShareRideForm } from '.'

describe('shareRideForm in form tests', () => {
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
               btnDisplayText={'SHARE'}
            />
         </Router>
      )
      const shareBtn = getByText('SHARE')
      fireEvent.click(shareBtn)
      getByText(strings.sourcePlaceError)
   })
})
