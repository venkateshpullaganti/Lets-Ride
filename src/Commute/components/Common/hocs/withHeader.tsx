import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import LoadingWrapperWithFailure from '../../../../Common/components/LoadingWrapperWithFailure'
import { Logo } from '../../../../Common/components/Logo'
import images from '../../../../Common/themes/Images'

import { goToHomePage } from '../../../utils/NavigationUtils/NavigationUtils'

import {
   REQUEST_PATHS,
   SHARE_PATHS
} from '../../../constants/NavigationConstants'
import strings from '../../../i18n/strings.json'

import { Dropdown } from '../../Dropdown'

import { Header, Actions, ProfileIcon, Body } from './styledComponents'
import { AuthStore } from '../../../../Authentication/stores/AuthStore'

interface ComponentProps extends RouteComponentProps {}

interface InjectProps extends ComponentProps {
   authStore: AuthStore
}

function withHeader<T>(WrappedComponent: React.ComponentType<T>) {
   @inject('authStore')
   @observer
   class EnhancedComponent extends Component<ComponentProps & T> {
      getInjectedProps = () => {
         const props = this.props as unknown
         return props as InjectProps
      }

      get authStore() {
         return this.getInjectedProps().authStore
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
         const { userProfile } = this.authStore
         const profileImage = userProfile
            ? userProfile.profileImage
            : images.defaultProfileImage
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
               <WrappedComponent {...(this.props as T)} />
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
