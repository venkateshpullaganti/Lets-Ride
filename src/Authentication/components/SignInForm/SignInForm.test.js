import React from 'react'
import { render } from '@testing-library/react'

import { SignInForm } from '.'

describe('Sign in form tests', () => {
   it('should render given name', () => {
      let expectedOutput = '123456'
      const { getByLabelText } = render(
         <SignInForm
            mobileNumber={expectedOutput}
            onChangeUserName={() => {}}
            isUserNameError={false}
         />
      )
      const MobileNumberField = getByLabelText('MOBILE NUMBER')

      expect(MobileNumberField.value).toBe(expectedOutput)
   })

   it('should render the given password', () => {
      let expectedOutput = 'tester-password'
      const { getByLabelText } = render(
         <SignInForm password={expectedOutput} onChangePassword={() => {}} />
      )
      const actualOutput = getByLabelText('PASSWORD').value
      expect(actualOutput).toBe(expectedOutput)
   })
})
