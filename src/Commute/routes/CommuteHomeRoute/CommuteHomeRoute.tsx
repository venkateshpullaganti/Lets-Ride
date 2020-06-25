import React, { Component } from 'react'
import { CommuteHomePage } from '../../components/CommuteHomePage'
import { inject } from 'mobx-react'
import { CommuteStore } from '../../stores/CommuteStore'

interface CommuteHomeRouteProps {}

interface injectProps extends CommuteHomeRouteProps {
   commuteStore: CommuteStore
}

@inject('commuteStore')
class CommuteHomeRoute extends Component<CommuteHomeRouteProps> {
   get injectProps() {
      return this.props as injectProps
   }
   render() {
      return <CommuteHomePage commuteStore={this.injectProps.commuteStore} />
   }
}

export { CommuteHomeRoute }
