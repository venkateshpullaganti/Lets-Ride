import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter, Redirect } from 'react-router-dom'
import { observable, computed } from 'mobx'
import { API_FETCHING } from '@ib/api-constants'
import { History, Location } from 'history'

import { HOMEPAGE_PATH } from '../../../Commute/constants/NavigationConstants'
import { isLoggedIn } from '../../../Common/utils/AuthUtils/AuthUtils'
import { displayToaster } from '../../../Common/components/Toaster'

import { MOBILE_NUMBER_LENGTH } from '../../constants/SignInConstants'
import { SignInForm } from '../../components/SignInForm'
import strings from '../../i18n/strings.json'
import { AuthStore } from '../../stores/AuthStore'

interface locationProp extends Location {
   state: {
      from: string
   }
}
type SignInProps = {
   authStore: AuthStore
   history: History
   location: locationProp
}

@inject('authStore')
@observer
class SignInRoute extends Component<SignInProps> {
   @observable mobileNumber!: string
   @observable password!: string
   @observable errorMsg!: string | null

   constructor(props: SignInProps) {
      super(props)
      this.init()
      this.onSuccess = this.onSuccess.bind(this)
      this.onFailure = this.onFailure.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
   }

   init = () => {
      this.mobileNumber = ''
      this.password = ''
      this.errorMsg = null
   }
   get authStore() {
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

   onSubmit() {
      if (this.mobileNumber.length !== MOBILE_NUMBER_LENGTH) {
         this.errorMsg = strings.mobileNumberEmptyError
      } else if (this.password === '') {
         this.errorMsg = strings.passwordEmptyError
      } else {
         this.errorMsg = null

         const requestObject = {
            phone_number: this.mobileNumber,
            password: this.password
         }

         this.authStore.userSignIn(
            requestObject,
            this.onSuccess,
            this.onFailure
         )
      }
   }

   onFailure(apiError) {
      this.errorMsg = apiError.message
      displayToaster('', true, apiError)
   }

   onSuccess() {
      const { history } = this.props
      let path: string | null = null

      if (this.props.location.state && this.props.location.state.from) {
         path = this.props.location.state.from
         if (path.includes('selectedTab')) path = null
      }

      history.replace({
         pathname: path || HOMEPAGE_PATH
      })

      displayToaster('', false)
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
      if (isLoggedIn()) {
         return <Redirect to={HOMEPAGE_PATH} />
      }
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
