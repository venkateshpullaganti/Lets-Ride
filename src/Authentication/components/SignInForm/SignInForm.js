import React, { Component } from 'react'

import { Button } from '../../../Common/components/Button'
import { FormHeading } from '../../../Common/components/FormHeading'
import { Input } from '../../../Common/components/Input'
import { Logo } from '../../../Common/components/Logo'

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
         OnChangeUserName,
         onChangePassword,
         userName,
         password,
         isUserNameError,
         isPasswordError
      } = this.props

      return (
         <Container>
            <Form onSubmit={this.onSubmit}>
               <Logo />
               <FormHeading headingText={strings.signInHeaderText} />
               <Input
                  type={'number'}
                  labelText={strings.MobileNumberLabelText}
                  id={'username'}
                  isError={isUserNameError}
                  onChange={OnChangeUserName}
                  errorMsg={errorMsg}
                  Required={'Required'}
                  value={userName}
               />
               <Input
                  type={'password'}
                  labelText={strings.PasswordLabelText}
                  id={'password'}
                  isError={isPasswordError}
                  onChange={onChangePassword}
                  errorMsg={errorMsg}
                  Required={'Required'}
                  value={password}
               />

               <Button
                  isLoading={isLoading}
                  displayText={strings.BtnLoginText}
               />
               <AskSignUp>
                  {strings.DontHaveAccountSignup}
                  <SignUpLink href='SignUpLocationUrl'>
                     {strings.SignUpText}
                  </SignUpLink>
               </AskSignUp>
            </Form>
         </Container>
      )
   }
}

export { SignInForm }
