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
         isError,
         isLoading,
         OnChangeUserName,
         onChangePassword
      } = this.props

      return (
         <Container>
            <Form onSubmit={this.onSubmit}>
               <Logo />
               <FormHeading headingText={strings.signInHeaderText} />
               <Input
                  type={'text'}
                  labelText={strings.UserNameLabelText}
                  id={'username'}
                  isError={isError}
                  onChange={OnChangeUserName}
                  errorMsg={errorMsg}
               />
               <Input
                  type={'password'}
                  labelText={strings.PasswordLabelText}
                  id={'password'}
                  isError={isError}
                  onChange={onChangePassword}
                  errorMsg={errorMsg}
               />

               <Button
                  isLoading={isLoading}
                  displayText={strings.BtnLoginText}
               />
               <AskSignUp>
                  {strings.DontHaveAccountSignup}
                  <SignUpLink href='SignUpLocation'>SignUp</SignUpLink>
               </AskSignUp>
            </Form>
         </Container>
      )
   }
}

export { SignInForm }
