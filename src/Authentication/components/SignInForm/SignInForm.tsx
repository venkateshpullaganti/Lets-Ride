import React, { Component } from 'react'

import { Button } from '../../../Common/components/Button'
import { FormHeading } from '../../../Common/components/FormHeading'
import { Input } from '../../../Common/components/Input'
import { Logo } from '../../../Common/components/Logo'
import { SIGN_UP_PATH } from '../../constants/NavigationConstants'

import { Container, Form, AskSignUp, SignUpLink } from './styledComponents'
import { withTranslation, WithTranslation } from 'react-i18next'
import { ChangeLanguageButtons } from '../../../Common/components/ChangeLanguageButtons'

interface SignInProps extends WithTranslation {
   errorMsg: string | null
   OnChangeMobileNumber: (event: React.ChangeEvent<HTMLInputElement>) => void
   onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void
   isLoading: boolean
   mobileNumber: string
   password: string
   isMobileNumberError: boolean
   isPasswordError: boolean
   onSubmit: () => void
   isError: boolean
}

class SignInForm extends Component<SignInProps> {
   static defaultProps = {
      errorMsg: null,
      isMobileNumberError: false,
      isPasswordError: false
   }
   onSubmit = (
      event:
         | React.FormEvent<HTMLFormElement>
         | React.MouseEvent<HTMLButtonElement>
   ): void => {
      const { onSubmit } = this.props
      event.preventDefault()
      onSubmit()
   }

   render() {
      const {
         errorMsg,
         OnChangeMobileNumber,
         onChangePassword,
         isLoading,
         mobileNumber,
         password,
         isMobileNumberError,
         isPasswordError,
         t
      } = this.props

      return (
         <Container>
            <ChangeLanguageButtons />
            <Form onSubmit={this.onSubmit}>
               <Logo />
               <FormHeading headingText={t('authModule:signInHeaderText')} />
               <Input
                  type={'number'}
                  labelText={t('authModule:mobileNumberLabelText')}
                  id={'signinMobileNumber'}
                  isError={isMobileNumberError}
                  onChange={OnChangeMobileNumber}
                  errorMsg={errorMsg}
                  value={mobileNumber}
                  isRequired={true}
               />
               <Input
                  type={'password'}
                  labelText={t('authModule:passwordLabelText')}
                  id={'signinpassword'}
                  isError={isPasswordError}
                  onChange={onChangePassword}
                  errorMsg={errorMsg}
                  isRequired={true}
                  value={password}
               />

               <Button
                  isLoading={isLoading}
                  displayText={t('authModule:btnLoginText')}
                  type={'submit'}
                  onClick={this.onSubmit}
               />
               <AskSignUp>
                  {t('authModule:dontHaveAccountSignup')}
                  <SignUpLink href={SIGN_UP_PATH}>
                     {t('authModule:signUpText')}
                  </SignUpLink>
               </AskSignUp>
            </Form>
         </Container>
      )
   }
}

export default withTranslation()(SignInForm)
