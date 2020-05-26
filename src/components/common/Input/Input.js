import React, { Component } from 'react'

import { CustomInput } from './styledComponents'

class Input extends Component {
   render() {
      const { type, label, id, onChangeInput } = this.props

      return <CustomInput type={type} id={id} onChange={onChangeInput} />
   }
}

export { Input }
