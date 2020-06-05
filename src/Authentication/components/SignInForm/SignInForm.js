import React, { Component } from 'react'

import { Button } from '../../../Common/components/Button'
import { FormHeading } from '../../../Common/components/FormHeading'
import { Input } from '../../../Common/components/Input'
import { Logo } from '../../../Common/components/Logo'
import { SIGN_UP_PATH } from '../../constants/NavigationConstants'
import strings from '../../i18n/strings.json'

import { Container, Form, AskSignUp, SignUpLink } from './styledComponents'

class SignInForm extends Component {
   onSubmit = event => {
      const { onSubmit } = this.props
      event.preventDefault()
      onSubmit()
   }

   render() {
      const {
         errorMsg,
         isLoading,
         OnChangeMobileNumber,
         onChangePassword,
         mobileNumber,
         password,
         isMobileNumberError,
         isPasswordError
      } = this.props

      return (
         <Container>
            <Form onSubmit={this.onSubmit}>
               <Logo />
               <FormHeading headingText={strings.signInHeaderText} />
               <Input
                  type={'number'}
                  labelText={strings.mobileNumberLabelText}
                  id={'signinMobileNumber'}
                  isError={isMobileNumberError}
                  onChange={OnChangeMobileNumber}
                  errorMsg={errorMsg}
                  value={mobileNumber}
                  isRequired={true}
               />
               <Input
                  type={'password'}
                  labelText={strings.passwordLabelText}
                  id={'signinpassword'}
                  isError={isPasswordError}
                  onChange={onChangePassword}
                  errorMsg={errorMsg}
                  isRequired={true}
                  value={password}
               />

               <Button
                  isLoading={isLoading}
                  displayText={strings.btnLoginText}
               />
               <AskSignUp>
                  {strings.dontHaveAccountSignup}
                  <SignUpLink href={SIGN_UP_PATH}>
                     {strings.signUpText}
                  </SignUpLink>
                  <p className='text-red-500 font-semibold'>{errorMsg}</p>
               </AskSignUp>
            </Form>
         </Container>
      )
   }
}

export { SignInForm }
