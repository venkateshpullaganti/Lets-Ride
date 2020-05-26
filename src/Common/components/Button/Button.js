import React, { Component } from 'react'
import ReactLoading from 'react-loading'

import { Btn } from './styledComponents'

class Button extends Component {
   render() {
      const { displayText, type, onClick, isLoading } = this.props

      return (
         <Btn onClick={onClick} type={type} disabled={isLoading}>
            {isLoading ? (
               <ReactLoading
                  type='spin'
                  width='20px'
                  height='20px'
                  alt='loader'
               />
            ) : (
               displayText ?? 'Button'
            )}
         </Btn>
      )
   }
}

export { Button }
