import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable, computed, reaction } from 'mobx'

import { DateFormatter } from '../../utils/DateFormatter'

import 'react-datepicker/dist/react-datepicker.css'

import { Button } from '../../../Common/components/Button'
import { Input } from '../../../Common/components/Input'
import { DateAndTimePicker } from '../../../Common/components/DateAndTimePicker'

import { Heading } from '../../styledComponents'
import strings from '../../i18n/strings.json'

import { Counter } from '../Counter'

import { FlexibleTimings } from '../FlexibleTimings'

import { RideRequest, Form } from './styledComponents'
import { API_SUCCESS, API_FETCHING } from '@ib/api-constants'

@observer
class RideRequestForm extends Component {
   @observable destinationPlace
   @observable sourcePlace
   @observable errorMsg
   @observable isFlexible
   @observable seatCount
   @observable laguageCount
   travelDate
   flexibleFromDate
   flexibleToDate

   @observable date = new Date()

   constructor(props) {
      super(props)
      this.init()
   }
   init = () => {
      this.seatCount = 0
      this.laguageCount = 0
      this.isFlexible = false
      this.destinationPlace = ''
      this.sourcePlace = ''
      this.errorMsg = null
      this.travelDate = ''
      this.flexibleFromDate = ''
      this.flexibleToDate = ''
   }
   onChangeSource = event => {
      this.sourcePlace = event.target.value
   }
   onChangeDestination = event => {
      this.destinationPlace = event.target.value
   }
   toggleIsFlexible = () => {
      this.isFlexible = !this.isFlexible
   }
   onChangeDate = dateObj => {
      this.travelDate = DateFormatter(dateObj)
   }

   onChangeFlexibleFromDate = dateObj => {
      this.flexibleFromDate = DateFormatter(dateObj)
   }
   onChangeFlexibleToDate = dateObj => {
      this.flexibleToDate = DateFormatter(dateObj)
   }

   onIncrementSeats = () => {
      this.seatCount++
   }
   onDecrementSeats = () => {
      if (this.seatCount > 0) this.seatCount--
   }
   onChangeSeats = event => {
      this.seatCount = parseInt(event.target.value)
   }
   onIncrementLaguage = () => {
      this.laguageCount++
   }
   onDecrementLaguage = () => {
      if (this.laguageCount > 0) this.laguageCount--
   }
   onChangeLaguage = event => {
      this.laguageCount = parseInt(event.target.value)
   }
   onSubmit = event => {
      event.preventDefault()
      const {
         sourcePlace,
         destinationPlace,
         isFlexible,
         flexibleFromDate,
         flexibleToDate,
         seatCount,
         laguageCount,
         travelDate
      } = this

      const { onSubmit } = this.props

      if (sourcePlace === '') {
         this.errorMsg = strings.sourcePlaceError
      } else if (destinationPlace === '') {
         this.errorMsg = strings.destinationPlaceError
      } else if (!isFlexible && this.travelDate === '') {
         this.errorMsg = strings.travelDateError
      } else if (
         isFlexible &&
         (flexibleFromDate === '' || flexibleToDate === '')
      ) {
         this.errorMsg = strings.flexibleTimingsError
      } else if (seatCount === 0) {
         this.errorMsg = strings.seatCountError
      } else {
         this.errorMsg = null

         const enteredDetails = {
            sourcePlace,
            destinationPlace,
            isFlexible,
            flexibleFromDate,
            flexibleToDate,
            seatCount,
            laguageCount,
            travelDate
         }
         console.log(enteredDetails)

         onSubmit(enteredDetails)
      }
   }
   @computed
   get isSourceError() {
      return this.errorMsg === strings.sourcePlaceError
   }
   @computed
   get isDestinationError() {
      return this.errorMsg === strings.destinationPlaceError
   }
   @computed
   get isTravelDateError() {
      return this.errorMsg === strings.travelDateError
   }
   @computed
   get isFlexibleTimingsError() {
      return this.errorMsg === strings.flexibleTimingsError && this.isFlexible
   }
   @computed
   get isSeatCountError() {
      return this.errorMsg === strings.seatCountError
   }
   successReaction = reaction(
      () => {
         return this.props.apiStatus === API_SUCCESS
      },
      boole => {
         this.init()
      }
   )
   componentWillUnmount() {
      this.successReaction()
   }

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
         laguageCount,
         onIncrementLaguage,
         onDecrementLaguage,
         onChangeLaguage,
         onChangeDate,
         isSeatCountError
      } = this

      const { apiStatus } = this.props
      const isLoading = apiStatus === API_FETCHING
      return (
         <RideRequest>
            <Form onSubmit={this.onSubmit}>
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
                  isRequired={true}
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
                  displayText={strings.requestBtnText}
                  disabled={isLoading}
               />
            </Form>
         </RideRequest>
      )
   }
}

export { RideRequestForm }
