import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import LoadingWrapperWithFailure from '../../../../Common/components/LoadingWrapperWithFailure'

import { Logo } from '../../../../Common/components/Logo'
import {
   REQUEST_PATHS,
   SHARE_PATHS,
   HOMEPAGE_PATH
} from '../../../constants/NavigationConstants'

import strings from '../../../i18n/strings.json'

import { Dropdown } from '../../Dropdown'

import { Container, Actions, ProfileIcon } from './styledComponents'
import { observable } from 'mobx'

function withHeader(WrappedComponent) {
   @inject('authStore')
   @observer
   class EnhancedComponent extends Component {
      @observable userProfile

      constructor(props) {
         super(props)
         this.userProfile = null
      }

      onClickProfile = () => {
         console.log(this.authStore.userProfile)
      }
      navigateToHome = () => {
         const { history } = this.props
         history.push(HOMEPAGE_PATH)
      }
      get authStore() {
         return this.props.authStore
      }
      componentDidMount() {
         if (this.userProfile === null) this.doNetworkCalls()
      }

      doNetworkCalls = async () => {
         console.log('network call')
         await this.authStore.getUserProfile()
         this.userProfile = this.authStore.userProfile
         console.log(this.userProfile)
      }
      renderSuccessUi = () => {
         return (
            <div className='w-screen h-screen'>
               <Container>
                  <Logo
                     onClick={this.navigateToHome}
                     width={'90px'}
                     height={'81px'}
                  />
                  <Actions>
                     <Dropdown
                        dropdownName={strings.requests}
                        links={REQUEST_PATHS}
                     />
                     <Dropdown
                        dropdownName={strings.share}
                        links={SHARE_PATHS}
                     />
                     <ProfileIcon
                        src={this.userProfile.profileImage}
                        onClick={this.onClickProfile}
                     />
                  </Actions>
               </Container>
               <WrappedComponent {...this.props} />
            </div>
         )
      }
      render() {
         console.log(this.authStore.userProfile)
         if (this.userProfile !== null)
            return (
               <div className='w-screen h-screen'>
                  <Container>
                     <Logo
                        onClick={this.navigateToHome}
                        width={'90px'}
                        height={'81px'}
                     />
                     <Actions>
                        <Dropdown
                           dropdownName={strings.requests}
                           links={REQUEST_PATHS}
                        />
                        <Dropdown
                           dropdownName={strings.share}
                           links={SHARE_PATHS}
                        />
                        <ProfileIcon
                           src={this.userProfile.profileImage}
                           onClick={this.onClickProfile}
                        />
                     </Actions>
                  </Container>
                  <WrappedComponent {...this.props} />
               </div>
            )
         return (
            <div className='h-screen w-screen flex items-center justify-center'>
               Loading
            </div>
         )
      }
   }
   return withRouter(EnhancedComponent)
}
export default withHeader

// <LoadingWrapperWithFailure
//    apiStatus={this.authStore.getUserProfileAPIStatus}
//    onRetryClick={this.doNetworkCalls}
//    apiError={this.authStore.getUserProfileAPIError}
//    renderSuccessUI={this.renderSuccessUi}
// />
