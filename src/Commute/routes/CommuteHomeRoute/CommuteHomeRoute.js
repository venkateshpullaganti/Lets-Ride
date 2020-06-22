import React, { Component } from 'react'
import { inject } from 'mobx-react'

import withHeader from '../../components/Common/hocs/withHeader'
import { CommuteHomePage } from '../../components/CommuteHomePage'

@inject('commuteStore')
class CommuteHomeRoute extends Component {
   render() {
      console.log(this.props.match)
      console.log(this.props.history)
      return (
         <CommuteHomePage
            commuteStore={this.props.commuteStore}
            history={this.props.history}
            match={this.props.match}
         />
      )
   }
}

export default withHeader(CommuteHomeRoute)
