import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { observable, computed } from 'mobx'
import { action } from '@storybook/addon-actions'

import { HOMEPAGE_PATH } from '../../../Commute/constants/NavigationConstants'

import strings from '../../i18n/strings.json'

import { YES, NO } from '../../constants/SignInConstants'
import { SignInForm } from '../../components/SignInForm'

@inject('authStore')
@observer
class SignInRoute extends Component {
   @observable mobileNumber
   @observable password
   @observable isLoading
   @observable errorMsg

   constructor(props) {
      super(props)
      this.init()
      this.onSuccess = this.onSuccess.bind(this)
      this.onFailure = this.onFailure.bind(this)
   }
   init = () => {
      this.mobileNumber = ''
      this.password = ''
      this.isLoading = false
      this.errorMsg = null
   }

   authStore = () => {
      return this.props.authStore
   }

   OnChangeUserName = event => {
      this.mobileNumber = event.target.value
   }
   onChangePassword = event => {
      this.password = event.target.value
   }
   @computed
   get isUserNameError() {
      return this.errorMsg === strings.userNameEmptyError
   }
   @computed
   get isPasswordError() {
      return this.errorMsg === strings.passwordEmptyError
   }
   @computed
   get isError() {
      return this.errorMsg !== null
   }

   onSubmit = () => {
      if (this.mobileNumber === '') {
         // this.signinFormRef.current.usernameRef.current.focus()

         this.errorMsg = strings.userNameEmptyError
      } else if (this.password === '') {
         // this.signinFormRef.current.passwordRef.current.focus()
         this.errorMsg = strings.passwordEmptyError
      } else {
         this.errorMsg = null
         this.isLoading = YES
         const requestObject = {
            phonenumber: this.mobileNumber,
            password: this.password
         }
         this.authStore().userSignIn(
            requestObject,
            this.onSuccess,
            this.onFailure
         )
      }
   }

   @action
   onFailure(APIError) {
      this.isLoading = NO
      this.errorMsg = APIError.message
   }

   @action
   onSuccess() {
      this.isLoading = NO
      const { history } = this.props

      history.replace({ pathname: HOMEPAGE_PATH })
   }

   render() {
      const {
         onSubmit,
         OnChangeUserName,
         onChangePassword,
         isLoading,
         errorMsg,
         isError,
         mobileNumber,
         password,
         isUserNameError,
         isPasswordError
      } = this

      return (
         <SignInForm
            onSubmit={onSubmit}
            OnChangeUserName={OnChangeUserName}
            onChangePassword={onChangePassword}
            isLoading={isLoading}
            isError={isError}
            errorMsg={errorMsg}
            mobileNumber={mobileNumber}
            password={password}
            isPasswordError={isPasswordError}
            isUserNameError={isUserNameError}
         />
      )
   }
}

export default withRouter(SignInRoute)
