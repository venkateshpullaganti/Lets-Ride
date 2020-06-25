import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import {
   Container,
   Links,
   ArrowIcon,
   DisplayName,
   LinkItem
} from './styledComponents'

import { navigateToGivenPath } from '../../../Common/utils/NavigationUtils/NavigationUtils'

import images from '../../../Common/themes/Images'

type linkType = { path: string; name: string }

interface DropdownProps extends RouteComponentProps {
   links: Array<linkType>
   dropdownName: string
}

@observer
class Dropdown extends Component<DropdownProps> {
   @observable shouldShowDropdown: boolean

   static defaultProps = {
      links: [
         { path: '/home', name: 'Link1' },
         { path: '/home', name: 'Link2' }
      ]
   }

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
      const { history } = this.props
      navigateToGivenPath(path, history)
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
               isSelected={this.shouldShowDropdown}
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
