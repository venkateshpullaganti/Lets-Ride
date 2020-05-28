import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import {
   Container,
   Links,
   ArrowIcon,
   DisplayName,
   LinkItem
} from './styledComponents'

import images from '../../../Common/themes/images'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

@observer
class Dropdown extends Component {
   @observable shouldShowDropdown

   constructor(props) {
      super(props)
      this.shouldShowDropdown = false
   }

   toggleDropdown = () => {
      this.shouldShowDropdown = !this.shouldShowDropdown
   }
   renderLinks = () => {
      const { links } = this.props
      return links.map(link => (
         <LinkItem key={link.path}>
            <Link key={link.path} to={link.path}>
               {link.name}
            </Link>
         </LinkItem>
      ))
   }

   render() {
      const { dropdownName } = this.props
      return (
         <Container>
            <DisplayName
               onClick={this.toggleDropdown}
               isBlueColor={this.shouldShowDropdown}
            >
               {dropdownName}
            </DisplayName>
            <ArrowIcon
               shouldRotate={this.shouldShowDropdown}
               src={images.dropDownArrow}
               width='16px'
               height='16px'
            />
            <Links shouldShow={this.shouldShowDropdown}>
               {this.renderLinks()}
            </Links>
         </Container>
      )
   }
}

export default withRouter(Dropdown)

Dropdown.defaultProps = {
   links: [
      { path: '/home', name: 'Link1' },
      { path: '/home', name: 'Link2' }
   ]
}
