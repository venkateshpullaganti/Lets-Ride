import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable, computed, reaction } from 'mobx'

import { DateFormatter } from '../../utils/DateFormatter/DateFormatter'

import 'react-datepicker/dist/react-datepicker.css'

import { Button } from '../../../Common/components/Button'
import { Input } from '../../../Common/components/Input'
import { DateAndTimePicker } from '../../../Common/components/DateAndTimePicker'

import { Heading } from '../../styledComponents'
import strings from '../../i18n/strings.json'

import { Counter } from '../Counter'

import { FlexibleTimings } from '../FlexibleTimings'

import { RideRequest, Form } from './styledComponents'
import { API_SUCCESS, API_FETCHING, APIStatus } from '@ib/api-constants'
import { RideFromData } from '../types'

interface RideRequestFromProps {
   onSubmit: (formData: RideFromData) => void
   apiStatus: APIStatus
}

@observer
class RideRequestForm extends Component<RideRequestFromProps> {
   @observable destinationPlace!: string
   @observable sourcePlace!: string
   @observable errorMsg!: string | null
   @observable isFlexible!: boolean
   @observable seatCount!: number
   @observable laguageCount!: number
   travelDate!: string
   flexibleFromDate!: string
   flexibleToDate!: string

   @observable date = new Date()

   constructor(props: RideRequestFromProps) {
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
   onChangeSource = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.sourcePlace = event.target.value
   }
   onChangeDestination = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.destinationPlace = event.target.value
   }
   toggleIsFlexible = () => {
      this.isFlexible = !this.isFlexible
   }
   onChangeDate = (dateObj: Date) => {
      this.travelDate = DateFormatter(dateObj)
   }

   onChangeFlexibleFromDate = (dateObj: Date) => {
      this.flexibleFromDate = DateFormatter(dateObj)
   }
   onChangeFlexibleToDate = (dateObj: Date) => {
      this.flexibleToDate = DateFormatter(dateObj)
   }

   onIncrementSeats = () => {
      this.seatCount++
   }
   onDecrementSeats = () => {
      if (this.seatCount > 0) this.seatCount--
   }
   onChangeSeats = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.seatCount = parseInt(event.target.value)
   }
   onIncrementLaguage = () => {
      this.laguageCount++
   }
   onDecrementLaguage = () => {
      if (this.laguageCount > 0) this.laguageCount--
   }
   onChangeLaguage = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.laguageCount = parseInt(event.target.value)
   }
   onSubmit = (
      event:
         | React.FormEvent<HTMLFormElement>
         | React.MouseEvent<HTMLButtonElement>
   ) => {
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
                  type={'submit'}
               />
            </Form>
         </RideRequest>
      )
   }
}

export { RideRequestForm }