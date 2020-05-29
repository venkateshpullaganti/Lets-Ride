import React, { Component } from 'react'
import { observer } from 'mobx-react'

import 'react-datepicker/dist/react-datepicker.css'

import { Button } from '../../../Common/components/Button'
import { Input } from '../../../Common/components/Input'
import { DateAndTimePicker } from '../../../Common/components/DateAndTimePicker'

import { Heading } from '../../styledComponents'
import strings from '../../i18n/strings.json'

import { Header } from '../Header'
import { Counter } from '../Counter'
import { FlexibleTimings } from '../FlexibleTimings'

import { RideRequest, Form } from './styledComponents'

@observer
class RideRequestForm extends Component {
   render() {
      const {
         onChangeSource,
         onChangeDestination,
         isSourceError,
         errorMsg,
         sourcePlace,
         isTravelDateError,
         isFlexibleTimingsError,
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
         isSeatCountError,
         btnDisplayText,
         onSubmit
      } = this.props

      return (
         <RideRequest>
            <Header />
            <Form onSubmit={onSubmit}>
               <Heading>{strings.rideRequestFormHeading}</Heading>
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
                  onChange={onChangeDate}
                  labelText={strings.dateAndTimeLabel}
                  isError={isTravelDateError}
                  errorMsg={errorMsg}
                  isRequired={!isFlexible}
               />
               <FlexibleTimings
                  isFlexible={isFlexible}
                  onChangeFlexibleFromDate={onChangeFlexibleFromDate}
                  onChangeFlexibleToDate={onChangeFlexibleToDate}
                  toggleIsFlexible={toggleIsFlexible}
                  isError={isFlexibleTimingsError}
                  errorMsg={errorMsg}
               />
               <Counter
                  labelText={strings.noOfSeatsText}
                  count={seatCount}
                  onIncrement={onIncrementSeats}
                  onDecrement={onDecrementSeats}
                  onChange={onChangeSeats}
                  isError={isSeatCountError}
                  errorMsg={errorMsg}
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
                  displayText={btnDisplayText}
                  disabled={isLoading}
               />
            </Form>
         </RideRequest>
      )
   }
}

export { RideRequestForm }
