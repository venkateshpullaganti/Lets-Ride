import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import { goToHomePage } from '../../../../Commute/utils/NavigationUtils'

import LoadingWrapperWithFailure from '../../../../Common/components/LoadingWrapperWithFailure'
import { Logo } from '../../../../Common/components/Logo'

import images from '../../../../Common/themes/Images'

import {
   REQUEST_PATHS,
   SHARE_PATHS,
   HOMEPAGE_PATH
} from '../../../constants/NavigationConstants'
import strings from '../../../i18n/strings.json'

import { Dropdown } from '../../Dropdown'

import { Header, Actions, ProfileIcon, Body } from './styledComponents'

function withHeader(WrappedComponent) {
   @inject('authStore')
   @observer
   class EnhancedComponent extends Component {
      get authStore() {
         return this.props.authStore
      }

      componentDidMount() {
         if (this.authStore.userProfile === null) {
            this.doNetworkCalls()
         }
      }

      onClickProfile = () => {
         console.log(this.authStore.userProfile)
      }

      navigateToHome = () => {
         const { history } = this.props
         goToHomePage(history)
      }

      doNetworkCalls = async () => {
         await this.authStore.getUserProfile()
      }

      renderSuccessUi = observer(() => {
         const profileImage =
            this.authStore.userProfile.profileImage ||
            images.defaultProfileImage
         return (
            <Body>
               <Header>
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
                        src={profileImage}
                        onClick={this.onClickProfile}
                     />
                  </Actions>
               </Header>
               <WrappedComponent {...this.props} />
            </Body>
         )
      })
      render() {
         const {
            getUserProfileAPIStatus,
            getUserProfileAPIError
         } = this.authStore
         const { doNetworkCalls, renderSuccessUi } = this

         return (
            <LoadingWrapperWithFailure
               apiStatus={getUserProfileAPIStatus}
               onRetryClick={doNetworkCalls}
               apiError={getUserProfileAPIError}
               renderSuccessUI={renderSuccessUi}
            />
         )
      }
   }
   return withRouter(EnhancedComponent)
}
export default withHeader
