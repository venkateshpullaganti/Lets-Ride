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

import images from '../../../Common/themes/Images'

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
   onBlur = () => {
      this.shouldShowDropdown = false
   }

   render() {
      const { dropdownName, icon, shouldRotateIcon } = this.props
      return (
         <Container>
            <ArrowIcon
               shouldRotate={this.shouldShowDropdown && shouldRotateIcon}
               src={icon}
               width='16px'
               height='16px'
            />
            <DisplayName
               type='button'
               onClick={this.toggleDropdown}
               onBlur={this.onBlur}
               isSelected={this.shouldShowDropdown && shouldRotateIcon}
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
