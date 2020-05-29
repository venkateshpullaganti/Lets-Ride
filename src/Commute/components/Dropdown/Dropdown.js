import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import {
   Container,
   Links,
   ArrowIcon,
   DisplayName,
   LinkItem
} from './styledComponents'

import images from '../../../Common/themes/images'

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
   onBlur = () => {
      this.shouldShowDropdown = false
   }
   navigateToPath = path => {
      console.log('object')
      const { history } = this.props
      history.push(path)
   }
   renderLinks = () => {
      const { links } = this.props

      return links.map(link => (
         <LinkItem
            key={link.path}
            onClick={() => this.navigateToPath(link.path)}
         >
            {link.name}
         </LinkItem>
      ))
   }

   render() {
      const { dropdownName } = this.props
      return (
         <Container onBlur={this.onBlur} type='button'>
            <DisplayName
               isBlueColor={this.shouldShowDropdown}
               onClick={this.toggleDropdown}
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
