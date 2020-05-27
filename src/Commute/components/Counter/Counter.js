import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import { Btn, CounterContainer, Label, Input } from './styledComponents'

@observer
class Counter extends Component<Props> {
   render() {
      const {
         labelText,
         count,
         onIncrement,
         onDecrement,
         onChange
      } = this.props
      return (
         <CounterContainer>
            <Label htmlFor={'input'}>{labelText}</Label>
            <Btn onClick={onIncrement}>+</Btn>
            <Input
               id={'input'}
               type={'number'}
               value={count}
               onChange={onChange}
            />
            <Btn onClick={onDecrement}>-</Btn>
         </CounterContainer>
      )
   }
}

export { Counter }
