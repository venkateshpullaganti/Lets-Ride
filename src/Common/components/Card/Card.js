import React, { Component } from 'react'

import { CardWrapper } from './styledComponents'

class Card extends Component {
   render() {
      const { className, children } = this.props
      return <CardWrapper className={className}>{children}</CardWrapper>
   }
}

export { Card }
