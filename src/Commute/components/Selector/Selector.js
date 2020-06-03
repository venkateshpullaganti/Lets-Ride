import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import uuid from 'react-uuid'

import {
   Container,
   List,
   ArrowIcon,
   DisplayName,
   Item,
   SortingOptions
} from './styledComponents'

import images from '../../../Common/themes/Images'

@observer
class Selector extends Component {
   @observable shouldShowDropdown

   // @observable shouldShowSortOptions

   constructor(props) {
      super(props)
      this.shouldShowDropdown = false
      this.shouldShowSortOptions = false
   }

   toggleDropdown = event => {
      this.shouldShowDropdown = !this.shouldShowDropdown
   }
   // toggleSortOptions = () => {
   //    this.shouldShowSortOptions = !this.shouldShowSortOptions
   // }

   renderOptions = () => {
      const { options, onChange } = this.props
      return options.map(option => (
         <Item
            key={uuid()}
            id={option.value}
            onClick={() => onChange(option.value)}
         >
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
      const { dropdownName, icon, shouldRotateIcon, isSorter } = this.props
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

// onMouseEnter={() => setIsShown(true)}
//         onMouseLeave={() => setIsShown(false)}

//  <SortingOptions shouldShowSortOptions={this.shouldShowSortOptions}>
//     <Item key={'ASC'} onClick={() => onChange(option.value, 'ASC')}>
//        {'Ascending'}
//     </Item>
//     <Item key={'DSC'} onClick={() => onChange(option.value, 'DESC')}>
//        {'Descending'}
//     </Item>
//  </SortingOptions>
