import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { Btn, CounterContainer, Label, Input } from './styledComponents'

@observer
class Counter extends Component {
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
            <Btn type='button' onClick={onDecrement}>
               -
            </Btn>
            <Input
               key={labelText}
               id={'input'}
               type={'number'}
               value={count}
               onChange={onChange}
            />
            <Btn type='button' onClick={onIncrement}>
               +
            </Btn>
         </CounterContainer>
      )
   }
}

export { Counter }

Counter.defaultProps = {
   count: 0
}
