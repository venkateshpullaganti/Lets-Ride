import React from 'react'
import { render } from '@testing-library/react'

import { SignInForm } from '.'

describe('Sign in form tests', () => {
   it('should render given mobile number', () => {
      let expectedOutput = '123456'
      const { getByLabelText } = render(
         <SignInForm
            mobileNumber={expectedOutput}
            OnChangeMobileNumber={() => {}}
            onSubmit={() => {}}
            onChangePassword={() => {}}
            isLoading={false}
            password={''}
            isError={false}
         />
      )
      const MobileNumberField = getByLabelText(
         'MOBILE NUMBER'
      ) as HTMLInputElement

      expect(MobileNumberField.value).toBe(expectedOutput)
   })

   it('should render the given password', () => {
      let expectedOutput = 'tester-password'
      const { getByLabelText } = render(
         <SignInForm
            password={expectedOutput}
            mobileNumber={''}
            onChangePassword={() => {}}
            OnChangeMobileNumber={() => {}}
            onSubmit={() => {}}
            isLoading={false}
            isError={false}
         />
      )
      const actualOutput = (getByLabelText('PASSWORD') as HTMLInputElement)
         .value
      expect(actualOutput).toBe(expectedOutput)
   })
})
