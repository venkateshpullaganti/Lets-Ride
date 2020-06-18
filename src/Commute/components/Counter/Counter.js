import React, { Component } from 'react'
import { observer } from 'mobx-react'

import {
   Btn,
   CounterContainer,
   Label,
   Input,
   Error,
   Required,
   WrapperContainer
} from './styledComponents'

@observer
class Counter extends Component {
   render() {
      const {
         labelText,
         count,
         onIncrement,
         onDecrement,
         onChange,
         isError,
         errorMsg,
         isRequired
      } = this.props
      return (
         <CounterContainer>
            <Label htmlFor={labelText}>
               {labelText}
               <Required>{isRequired ? '*' : null}</Required>
            </Label>

            <WrapperContainer>
               <Btn type='button' onClick={onDecrement}>
                  {'-'}
               </Btn>
               <Input
                  key={labelText}
                  id={labelText}
                  type={'number'}
                  value={count}
                  onChange={onChange}
                  isError={isError}
               />
               <Btn type='button' onClick={onIncrement}>
                  {'+'}
               </Btn>
               <Error>{isError ? errorMsg : null}</Error>
            </WrapperContainer>
         </CounterContainer>
      )
   }
}

export { Counter }

Counter.defaultProps = {
   count: 0
}
