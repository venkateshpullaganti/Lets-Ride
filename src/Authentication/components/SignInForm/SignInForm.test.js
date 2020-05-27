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

   it('should render the mobilenumber error', () => {
      const { getByText } = render(
         <SignInForm isUserNameError={true} errorMsg='Invalid Username' />
      )

      getByText(/Invalid Username/i)
   })
   it('should render the password error', () => {
      const { getByText } = render(
         <SignInForm isPasswordError={true} errorMsg='Invalid Password' />
      )

      getByText(/Invalid Password/i)
   })
})
