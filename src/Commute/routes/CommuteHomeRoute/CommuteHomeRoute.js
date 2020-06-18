import React, { Component } from 'react'
import { CommuteHomePage } from '../../components/CommuteHomePage'
import { inject } from 'mobx-react'

@inject('commuteStore')
class CommuteHomeRoute extends Component {
   render() {
      return <CommuteHomePage commuteStore={this.props.commuteStore} />
   }
}

export { CommuteHomeRoute }
