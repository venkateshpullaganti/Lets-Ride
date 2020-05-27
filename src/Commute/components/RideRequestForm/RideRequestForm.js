import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import moment from 'moment'
import { Header } from '../Header'

import 'react-datepicker/dist/react-datepicker.css'

import { Button } from '../../../Common/components/Button'
import { Input } from '../../../Common/components/Input'
import { DateAndTimePicker } from '../../../Common/components/DateAndTimePicker'

import { Heading } from '../../styledComponents'
import strings from '../../i18n/strings.json'

import { Counter } from '../Counter'
import { FlexibleTimings } from '../FlexibleTimings'

import { RideRequest, Form } from './styledComponents'

@observer
class RideRequestForm extends Component {
   @observable date = new Date()
   onChangeDate = date => {
      const dateInp = moment(date).format('YYYY-MM-DD HH:MM:SS')
      console.log(dateInp)
   }
   render() {
      const {
         onChangeSource,
         onChangeDestination,
         isSourceError,
         errorMsg,
         sourcePlace,
         isDestinationError,
         destinationPlace,
         onChangeflexibleFromDate,
         onChangeflexibleToDate,
         onIncrementSeats,
         onDecrementSeats,
         onChangeSeats
      } = this.props
      return (
         <RideRequest>
            <Header />
            <Form>
               <Heading>{strings.rideRequestFormHeading}</Heading>
               <Input
                  type={'text'}
                  labelText={strings.fromText}
                  id={'sourcePlace'}
                  isError={isSourceError}
                  onChange={onChangeSource}
                  errorMsg={errorMsg}
                  Required={'Required'}
                  value={sourcePlace}
               />
               <Input
                  type={'text'}
                  labelText={strings.toText}
                  id={'destination'}
                  isError={isDestinationError}
                  onChange={onChangeDestination}
                  errorMsg={errorMsg}
                  Required={'Required'}
                  value={destinationPlace}
               />

               <DateAndTimePicker
                  date={this.date}
                  onChange={this.onChangeDate}
                  labelText={'Date and Time'}
               />
               <FlexibleTimings
                  date={this.date}
                  oChangeflexibleFromDate={onChangeflexibleFromDate}
                  oChangeflexibleToDate={onChangeflexibleToDate}
               />
               <Counter
                  labelText={'No of assets'}
                  count={4}
                  onIncrement={onIncrementSeats}
                  onDecrement={onDecrementSeats}
                  onChange={onChangeSeats}
               />
               <Counter
                  labelText={'Luggage quantity'}
                  count={4}
                  onIncrement={onIncrementSeats}
                  onDecrement={onDecrementSeats}
                  onChange={onChangeSeats}
               />
               <Button displayText={'Request'} />
            </Form>
         </RideRequest>
      )
   }
}

export { RideRequestForm }
