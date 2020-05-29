import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import {
   Container,
   List,
   ArrowIcon,
   DisplayName,
   Item
} from './styledComponents'

import images from '../../../Common/themes/images'

@observer
class Selector extends Component {
   @observable shouldShowDropdown

   constructor(props) {
      super(props)
      this.shouldShowDropdown = false
   }

   toggleDropdown = () => {
      this.shouldShowDropdown = !this.shouldShowDropdown
   }
   renderOptions = () => {
      const { options, onChange } = this.props
      return options.map(option => (
         <Item key={option} onClick={() => onChange(option)}>
            {option}
         </Item>
      ))
   }

   render() {
      const { dropdownName } = this.props
      return (
         <Container>
            <ArrowIcon
               shouldRotate={this.shouldShowDropdown}
               src={images.filterIcon}
               width='16px'
               height='16px'
            />
            <DisplayName
               onClick={this.toggleDropdown}
               isSelected={this.shouldShowDropdown}
            >
               {dropdownName}
            </DisplayName>
            <List id={dropdownName} shouldShow={this.shouldShowDropdown}>
               {this.renderOptions()}
            </List>
         </Container>
      )
   }
}

export { Selector }
