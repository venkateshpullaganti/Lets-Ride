import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable, computed } from 'mobx'

import { HOME_PREFIX } from '../../constants/NavigationConstants'

import {
   SHARED_DETAILS,
   MY_REQUESTS,
   MATCHING_RESULTS,
   TABS
} from '../../constants/CommuteConstants'
import strings from '../../i18n/strings.json'

import { TabBar } from '../TabBar'
import withHeader from '../Common/hocs/withHeader'
import { Header } from '../Header'
import { MyRequests } from '../MyRequests'
import { MatchingResults } from '../MatchingResults'

import { Root, Body } from './styledComponents'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
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
      const selectedTab = this.props.match.params.selectedTab
      this.selectedCategory = selectedTab
   }

   renderSelectedCategory = () => {
      if (this.selectedCategory === MATCHING_RESULTS) {
         return <MatchingResults />
      } else if (this.selectedCategory === MY_REQUESTS) {
         return <MyRequests />
      }
      return (
         <div className='text-center'>
            This Page is Under Development. Sorry for inconvience.
         </div>
      )
   }
   onChangeSelectedCategory = selectedTab => {
      const { history } = this.props
      console.log(history)
      history.push({
         pathname: `${HOME_PREFIX}/${selectedTab}`
      })
      this.selectedCategory = selectedTab
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

const HomeWithHeader = withHeader(CommuteHomePage)

export default HomeWithHeader
