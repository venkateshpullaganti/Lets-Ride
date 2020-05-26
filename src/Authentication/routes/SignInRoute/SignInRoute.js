import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { observable } from 'mobx'

import { HOMEPAGE_PATH } from '../../../Commute/constants/NavigationConstants'

import { YES, NO } from '../../constants/SignInConstants'
import { SignInForm } from '../../components/SignInForm'
import { action } from '@storybook/addon-actions'

@inject('authStore')
@observer
class SignInRoute extends Component {
   @observable userName
   @observable password
   @observable isLoading
   @observable isError
   errorMsg

   constructor(props) {
      super(props)
      this.onSuccess = this.onSuccess.bind(this)
      this.onFailure = this.onFailure.bind(this)
   }

   authStore = () => {
      return this.props.authStore
   }

   OnChangeUserName = event => {
      this.userName = event.target.value
   }
   onChangePassword = event => {
      this.password = event.target.value
   }

   onSubmit = () => {
      if (this.userName === '') {
         // this.signinFormRef.current.usernameRef.current.focus()
         this.isError = YES
         this.errorMsg = 'Username empty'
      } else if (this.password === '') {
         // this.signinFormRef.current.passwordRef.current.focus()
         this.isError = YES
         this.errorMsg = 'Password empty'
      } else {
         this.errorMsg = null
         this.isError = NO
         this.isLoading = YES
         const requestObject = {
            phonenumber: this.userName,
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
         isError
      } = this

      return (
         <SignInForm
            onSubmit={onSubmit}
            OnChangeUserName={OnChangeUserName}
            onChangePassword={onChangePassword}
            isLoading={isLoading}
            isError={isError}
            errorMsg={errorMsg}
         />
      )
   }
}

export default withRouter(SignInRoute)
