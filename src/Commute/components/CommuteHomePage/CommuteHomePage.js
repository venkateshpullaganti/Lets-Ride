import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable, computed } from 'mobx'

import { MyRequests } from '../MyRequests'

import {
   SHARED_DETAILS,
   MY_REQUESTS,
   MATCHING_RESULTS
} from '../../constants/CommuteConstants'
import strings from '../../i18n/strings.json'

import { TabBar } from '../TabBar'
import withHeader from '../Common/hocs/withHeader'

import { Root, Body, NavBar, NavBtn } from './styledComponents'
import { Header } from '../Header'

@observer
class CommuteHomePage extends Component {
   @observable selectedCategory

   constructor(props) {
      super(props)
      this.init()
   }
   init = () => {
      this.selectedCategory = MATCHING_RESULTS
   }

   renderSelectedCategory = () => {
      if (this.selectedCategory === MATCHING_RESULTS) {
         return <div>Matching Results</div>
      } else if (this.selectedCategory === MY_REQUESTS) {
         return <MyRequests />
      }
      return <div>shared Details</div>
   }
   onChangeSelectedCategory = selectedTab => {
      this.selectedCategory = selectedTab
      console.log(this.selectedCategory)
   }

   render() {
      return (
         <Root>
            <Body>
               <Header />
               <TabBar
                  onChange={this.onChangeSelectedCategory}
                  tabs={[MATCHING_RESULTS, MY_REQUESTS, SHARED_DETAILS]}
                  selectedTab={this.selectedCategory}
               />

               {this.renderSelectedCategory()}
            </Body>
         </Root>
      )
   }
}

export default CommuteHomePage

// <NavBar>
//                   <NavBtn
//                      isSelected={this.isMatchingResultsSelected}
//                      onClick={this.onSelectMatchingResults}
//                   >
//                      {strings.matchingResults}
//                   </NavBtn>
//                   <NavBtn
//                      isSelected={this.isMyRequestsSelected}
//                      onClick={this.onSelectMyRequests}
//                   >
//                      {strings.myRequests}
//                   </NavBtn>
//                   <NavBtn
//                      isSelected={this.isSharedDetailsSelected}
//                      onClick={this.onSelectSharedDetails}
//                   >
//                      {strings.sharedDetails}
//                   </NavBtn>
//                </NavBar>
