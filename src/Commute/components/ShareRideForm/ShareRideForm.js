import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { Header } from '../Header'

import 'react-datepicker/dist/react-datepicker.css'

import { Button } from '../../../Common/components/Button'
import { Input } from '../../../Common/components/Input'
import { DateAndTimePicker } from '../../../Common/components/DateAndTimePicker'

import { Heading } from '../../styledComponents'
import strings from '../../i18n/strings.json'

import { Counter } from '../Counter'
import { FlexibleTimings } from '../FlexibleTimings'

import { ShareRide, Form } from './styledComponents'

@observer
class ShareRideForm extends Component {
   @observable date = new Date()

   render() {
      const {
         onChangeSource,
         onChangeDestination,
         isSourceError,
         errorMsg,
         sourcePlace,
         isDestinationError,
         destinationPlace,
         onChangeFlexibleFromDate,
         onChangeFlexibleToDate,
         onIncrementSeats,
         onDecrementSeats,
         onChangeSeats,
         toggleIsFlexible,
         isFlexible,
         seatCount,
         isLoading,
         laguageCount,
         onIncrementLaguage,
         onDecrementLaguage,
         onChangeLaguage,
         onChangeDate,
         onSubmit
      } = this.props

      return (
         <ShareRide>
            <Header />
            <Form onSubmit={onSubmit}>
               <Heading className='self-center'>
                  {strings.rideShareHeaderText}
               </Heading>
               <Input
                  type={'text'}
                  labelText={strings.fromText}
                  id={'sourcePlace'}
                  isError={isSourceError}
                  onChange={onChangeSource}
                  errorMsg={errorMsg}
                  isRequired={true}
                  value={sourcePlace}
               />
               <Input
                  type={'text'}
                  labelText={strings.toText}
                  id={'destination'}
                  isError={isDestinationError}
                  onChange={onChangeDestination}
                  errorMsg={errorMsg}
                  isRequired={true}
                  value={destinationPlace}
               />

               <DateAndTimePicker
                  date={this.date}
                  onChange={onChangeDate}
                  labelText={strings.dateAndTimeLabel}
               />
               <FlexibleTimings
                  date={this.date}
                  isFlexible={isFlexible}
                  onChangeFlexibleFromDate={onChangeFlexibleFromDate}
                  onChangeFlexibleToDate={onChangeFlexibleToDate}
                  toggleIsFlexible={toggleIsFlexible}
               />
               <Counter
                  labelText={strings.noOfSeatsText}
                  count={seatCount}
                  onIncrement={onIncrementSeats}
                  onDecrement={onDecrementSeats}
                  onChange={onChangeSeats}
               />
               <Counter
                  key={strings.luggageQuantity}
                  labelText={strings.luggageQuantity}
                  count={laguageCount}
                  onIncrement={onIncrementLaguage}
                  onDecrement={onDecrementLaguage}
                  onChange={onChangeLaguage}
               />
               <Button
                  isLoading={isLoading}
                  displayText={strings.shareBtnText}
               />
            </Form>
         </ShareRide>
      )
   }
}

export { ShareRideForm }
