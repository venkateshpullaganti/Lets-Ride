import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import uuid from 'react-uuid'

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
      this.shouldShowSortOptions = false
   }

   toggleDropdown = event => {
      this.shouldShowDropdown = !this.shouldShowDropdown
   }

   renderOptions = () => {
      const { options, onChange } = this.props
      return options.map(option => (
         <Item key={uuid()} id={option.value} onClick={() => onChange(option)}>
            {option.label}
         </Item>
      ))
   }
   onBlur = () => {
      setTimeout(() => {
         this.shouldShowDropdown = false
      }, 250)
   }

   render() {
      const { dropdownName, icon, shouldRotateIcon } = this.props
      return (
         <Container>
            <ArrowIcon
               shouldRotate={this.shouldShowDropdown && shouldRotateIcon}
               src={icon || images.sortIcon}
               width='16px'
               height='16px'
            />
            <DisplayName
               type='button'
               onClick={this.toggleDropdown}
               isSelected={this.shouldShowDropdown && shouldRotateIcon}
               onBlur={this.onBlur}
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
