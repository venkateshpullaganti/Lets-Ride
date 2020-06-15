import React, { Component } from 'react'
import ReactLoading from 'react-loading'

import strings from '../../i18n/strings.json'

import { Btn, BtnTypo } from './styledComponents'

class Button extends Component {
   render() {
      const { displayText, type, onClick, isLoading, ...rest } = this.props

      return (
         <Btn onClick={onClick} type={type} disabled={isLoading} {...rest}>
            {isLoading ? (
               <ReactLoading
                  type='spin'
                  width='20px'
                  height='20px'
                  alt={'loader'}
               />
            ) : (
               <BtnTypo>{displayText ?? strings.btnText}</BtnTypo>
            )}
         </Btn>
      )
   }
}

export { Button }
