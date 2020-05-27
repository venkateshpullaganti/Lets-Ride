import React, { Component } from 'react'

import { Logo } from '../../../Common/components/Logo'

import { Dropdown } from '../Dropdown'

import { Container, Actions, ProfileIcon } from './styledComponents'

import { REQUEST_PATHS, SHARE_PATHS } from '../../constants/NavigationConstants'

class Header extends Component {
   onClickProfile = () => {}
   render() {
      return (
         <Container>
            <Logo width={'90px'} height={'81px'} />
            <Actions>
               <Dropdown dropdownName={'Requests'} links={REQUEST_PATHS} />
               <Dropdown dropdownName={'Share'} links={SHARE_PATHS} />
               <ProfileIcon onClick={this.onClickProfile}>{'HS'}</ProfileIcon>
            </Actions>
         </Container>
      )
   }
}

export { Header }
