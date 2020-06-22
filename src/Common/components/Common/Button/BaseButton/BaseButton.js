/** @jsx jsx */
import React, { Component } from 'react'
import { css, jsx } from '@emotion/core'

import { Button, ButtonName } from './styledComponents'

class BaseButton extends Component {
   static defaultProps = {
      className: '',
      text: 'Button'
   }
   render() {
      const { className, text, onClick, isDisabled, typo } = this.props
      let otherProps
      if (onClick) otherProps = { onClick: onClick }

      return (
         <Button isDisabled={isDisabled} className={className} {...otherProps}>
            <ButtonName css={typo}>{text}</ButtonName>
         </Button>
      )
   }
}

export { BaseButton }
