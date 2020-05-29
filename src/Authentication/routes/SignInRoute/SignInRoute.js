import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter, Redirect } from 'react-router-dom'
import { observable, computed } from 'mobx'
import { API_FETCHING } from '@ib/api-constants'

import { HOMEPAGE_PATH } from '../../../Commute/constants/NavigationConstants'

import strings from '../../i18n/strings.json'
import { MOBILE_NUMBER_LENGTH } from '../../constants/SignInConstants'
import { SignInForm } from '../../components/SignInForm'

@inject('authStore')
@observer
class SignInRoute extends Component {
   @observable mobileNumber
   @observable password
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
      this.errorMsg = null
   }

   authStore = () => {
      return this.props.authStore
   }

   OnChangeMobileNumber = event => {
      this.mobileNumber = event.target.value
   }
   onChangePassword = event => {
      this.password = event.target.value
   }
   @computed
   get isMobileNumberError() {
      return this.errorMsg === strings.mobileNumberEmptyError
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
      if (this.mobileNumber.length !== MOBILE_NUMBER_LENGTH) {
         this.errorMsg = strings.mobileNumberEmptyError
      } else if (this.password === '') {
         this.errorMsg = strings.passwordEmptyError
      } else {
         this.errorMsg = null

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

   onFailure(apiError) {
      this.errorMsg = apiError.message
   }

   onSuccess() {
      const { history } = this.props

      history.replace({ pathname: HOMEPAGE_PATH })
   }

   render() {
      const {
         onSubmit,
         OnChangeMobileNumber,
         onChangePassword,
         errorMsg,
         isError,
         mobileNumber,
         password,
         isMobileNumberError,
         isPasswordError
      } = this

      // if (!isLoggedIn()) {
      //    return <Redirect to={{ pathname: HOMEPAGE_PATH }} />
      // }
      return (
         <SignInForm
            onSubmit={onSubmit}
            OnChangeMobileNumber={OnChangeMobileNumber}
            onChangePassword={onChangePassword}
            isLoading={this.authStore.getUserSignInAPIStatus === API_FETCHING}
            isError={isError}
            errorMsg={errorMsg}
            mobileNumber={mobileNumber}
            password={password}
            isPasswordError={isPasswordError}
            isMobileNumberError={isMobileNumberError}
         />
      )
   }
}

export default withRouter(SignInRoute)
