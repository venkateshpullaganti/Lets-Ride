import React, { Component, useState } from 'react'
import { observer } from 'mobx-react'

import { DateAndTimePicker } from '../../../Common/components/DateAndTimePicker'

import strings from '../../i18n/strings.json'

import { DatePickers, FlexibleContainer } from './styledComponents'

@observer
class FlexibleTimings extends Component {
   fromTime
   toTime

   render() {
      const {
         onChangeFlexibleFromDate,
         onChangeFlexibleToDate,
         toggleIsFlexible,
         isFlexible,
         date
      } = this.props
      return (
         <FlexibleContainer>
            <DatePickers shouldShow={isFlexible}>
               <DateAndTimePicker
                  date={date}
                  onChange={onChangeFlexibleFromDate}
                  labelText={strings.fromText}
               />
               <DateAndTimePicker
                  date={date}
                  onChange={onChangeFlexibleToDate}
                  labelText={strings.toText}
               />
            </DatePickers>
            <span>
               <input
                  type='checkbox'
                  id='flexibleTime'
                  onClick={toggleIsFlexible}
                  defaultChecked={isFlexible}
               />
               <label htmlFor={'flexibleTime'}>{'Flexible Timings'}</label>
            </span>
         </FlexibleContainer>
      )
   }
}

export { FlexibleTimings }
