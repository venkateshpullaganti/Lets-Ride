import React, { Component } from 'react'

import { Container } from './styledComponents'

class Arrow extends Component {
   render() {
      const { dropdownName } = this.props
      return <Container>{dropdownName}</Container>
   }
}

export { Arrow }
