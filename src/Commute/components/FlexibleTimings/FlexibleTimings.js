import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import { DateAndTimePicker } from '../../../Common/components/DateAndTimePicker'

import { DatePickers, FlexibleContainer } from './styledComponents'

@observer
class FlexibleTimings extends Component {
   @observable isFlexible = false
   fromTime
   toTime

   onClickCheckbox = () => {
      this.isFlexible = !this.isFlexible
   }

   render() {
      const {
         onChangeflexibleToDate,
         onChangeflexibleFromDate,
         date
      } = this.props
      return (
         <FlexibleContainer>
            <DatePickers shouldShow={this.isFlexible}>
               <DateAndTimePicker
                  date={date}
                  onChange={onChangeflexibleFromDate}
                  labelText={'FROM'}
               />
               <DateAndTimePicker
                  date={date}
                  onChange={onChangeflexibleToDate}
                  labelText={'TO'}
               />
            </DatePickers>
            <input
               type='checkbox'
               id='flexibleTime'
               onClick={this.onClickCheckbox}
               defaultChecked={this.isFlexible}
            />
            <label htmlFor={'flexibleTime'}>{'Flexible Timings'}</label>
         </FlexibleContainer>
      )
   }
}

export { FlexibleTimings }
