import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'

import { HOME_PREFIX } from '../../constants/NavigationConstants'
import {
   MY_REQUESTS,
   MATCHING_RESULTS,
   TABS
} from '../../constants/CommuteConstants'
import { navigateToGivenPath } from '../../../Common/utils/NavigationUtils/NavigationUtils'

import { TabBar } from '../TabBar'
import { MyRequests } from '../MyRequests'
import { MatchingResults } from '../MatchingResults'

import { Root, Body } from './styledComponents'

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
   componentDidMount() {
      this.getSelectedTab()
   }

   getSelectedTab = () => {
      const selectedTab = this.props.match.params.selectedTab
      this.selectedCategory = selectedTab
      console.log(this.selectedCategory)
   }

   renderSelectedCategory = () => {
      console.log('render selected Category')
      const { commuteStore } = this.props
      if (this.selectedCategory === MATCHING_RESULTS) {
         return (
            <MatchingResults
               commuteStore={commuteStore}
               history={this.props.history}
            />
         )
      } else if (this.selectedCategory === MY_REQUESTS) {
         return (
            <MyRequests
               commuteStore={commuteStore}
               history={this.props.history}
            />
         )
      }
      return (
         <div className='text-center'>
            This Page is Under Development. Sorry for inconvience.
         </div>
      )
   }
   @action.bound
   onChangeSelectedCategory = async selectedTab => {
      const { history } = this.props
      const path = `${HOME_PREFIX}/${selectedTab}`
      await navigateToGivenPath(path, history)

      this.getSelectedTab()
   }

   render() {
      return (
         <Root>
            <Body>
               <TabBar
                  onChange={this.onChangeSelectedCategory}
                  tabs={TABS}
                  selectedTab={this.selectedCategory}
               />

               {this.renderSelectedCategory()}
            </Body>
         </Root>
      )
   }
}

export { CommuteHomePage }
