import React, { Component } from 'react'
import ReactLoading from 'react-loading'

import strings from '../../i18n/strings.json'

import { Btn, BtnTypo } from './styledComponents'

type BtnTypes = 'button' | 'submit' | 'reset' | undefined
interface ButtonProps {
   displayText: string
   type: BtnTypes
   onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
   isLoading: boolean
}

class Button extends Component<ButtonProps> {
   static defaultProps = {
      displayText: 'Button',
      type: 'button',
      onClick: () => {}
   }
   render() {
      const { displayText, type, onClick, isLoading } = this.props

      return (
         <Btn onClick={onClick} type={type} disabled={isLoading}>
            {isLoading ? (
               <ReactLoading
                  type='spin'
                  width='20px'
                  height='20px'
                  // alt={'loader'}
               />
            ) : (
               <BtnTypo>{displayText ?? strings.btnText}</BtnTypo>
            )}
         </Btn>
      )
   }
}

export { Button }
