import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import tw from 'tailwind.macro'

import { Logo } from '../../../Common/components/Logo'
import {
   REQUEST_PATHS,
   SHARE_PATHS,
   HOMEPAGE_PATH
} from '../../constants/NavigationConstants'

import strings from '../../i18n/strings.json'

import { Dropdown } from '../Dropdown'

import { Container, Actions, ProfileIcon } from './styledComponents'

class Header extends Component {
   onClickProfile = () => {}
   navigateToHome = () => {
      const { history } = this.props
      history.push(HOMEPAGE_PATH)
   }
   render() {
      return (
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
               <Dropdown dropdownName={strings.share} links={SHARE_PATHS} />
               <ProfileIcon onClick={this.onClickProfile}>{'HS'}</ProfileIcon>
            </Actions>
         </Container>
      )
   }
}

export default withRouter(Header)
