import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { DateAndTimePicker } from '../../../Common/components/DateAndTimePicker'

import strings from '../../i18n/strings.json'

import { DatePickers, FlexibleContainer, Checkbox } from './styledComponents'

@observer
class FlexibleTimings extends Component {
   render() {
      const {
         onChangeFlexibleFromDate,
         onChangeFlexibleToDate,
         toggleIsFlexible,
         isFlexible,
         isError,
         errorMsg
      } = this.props
      return (
         <FlexibleContainer>
            <DatePickers shouldShow={isFlexible}>
               <DateAndTimePicker
                  onChange={onChangeFlexibleFromDate}
                  labelText={strings.fromText}
                  isRequired={isFlexible}
                  isError={isError}
                  errorMsg={errorMsg}
               />
               <DateAndTimePicker
                  onChange={onChangeFlexibleToDate}
                  labelText={strings.toText}
                  isRequired={isFlexible}
                  isError={isError}
                  errorMsg={errorMsg}
               />
            </DatePickers>
            <span>
               <Checkbox
                  type='checkbox'
                  id='flexibleTime'
                  onClick={toggleIsFlexible}
                  defaultChecked={isFlexible}
               />
               <label htmlFor={'flexibleTime'}>{strings.flexibleTimings}</label>
            </span>
         </FlexibleContainer>
      )
   }
}

export { FlexibleTimings }
