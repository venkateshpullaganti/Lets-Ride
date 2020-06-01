import React, { Component } from 'react'
import moment from 'moment'
import { observer, inject } from 'mobx-react'
import { observable, computed } from 'mobx'
import { API_FETCHING } from '@ib/api-constants'

import { RideRequestForm } from '../../components/RideRequestForm'
import strings from '../../i18n/strings.json'

@inject('requestStore')
@observer
class RideRequestRoute extends Component {
   @observable destinationPlace
   @observable sourcePlace
   @observable errorMsg
   @observable isFlexible
   @observable seatCount
   @observable laguageCount
   travelDate
   flexibleFromDate
   flexibleToDate
   @observable btnDisplayText
   @observable date = new Date()

   constructor(props) {
      super(props)
      this.init()
      this.onSubmit = this.onSubmit.bind(this)
      this.onFailure = this.onFailure.bind(this)
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
      this.btnDisplayText = strings.requestBtnText
   }

   get requestStore() {
      return this.props.requestStore
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
      this.travelDate = moment(dateObj).format('YYYY-MM-DD hh:mm A')
   }

   onChangeFlexibleFromDate = date => {
      this.flexibleFromDate = moment(date).format('YYYY-MM-DD hh:mm A')
   }
   onChangeFlexibleToDate = date => {
      this.flexibleToDate = moment(date).format('YYYY-MM-DD hh:mm A')
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

   onSubmit(event) {
      event.preventDefault()

      const {
         sourcePlace,
         destinationPlace,
         isFlexible,
         flexibleFromDate,
         flexibleToDate,
         seatCount
      } = this

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

         this.doNetworkCalls()
      }
   }

   doNetworkCalls = () => {
      this.isLoading = true
      const { sourcePlace, destinationPlace } = this
      let mainDate, fromDate, toDate

      if (this.isFlexible) {
         mainDate = ''
         fromDate = this.flexibleFromDate
         toDate = this.flexibleToDate
      } else {
         mainDate = this.travelDate
         fromDate = ''
         toDate = ''
      }

      const requestObj = {
         source: sourcePlace,
         destination: destinationPlace,
         flexible_timings: this.isFlexible,
         travel_date_time: mainDate,
         flexible_from_date_time: fromDate,
         flexible_to_date_time: toDate,
         seats: this.seatCount,
         laguage_quantity: this.laguageCount
      }
      console.log(requestObj)

      this.requestStore.rideRequest(requestObj, this.onSuccess, this.onFailure)
   }
   onSuccess() {
      this.init()
   }

   onFailure(error) {
      this.btnDisplayText = strings.retry
      console.log('failed')
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

   render() {
      const {
         isFlexible,
         seatCount,
         laguageCount,
         isSourceError,
         errorMsg,
         sourcePlace,
         destinationPlace,
         isDestinationError,
         isTravelDateError,
         isFlexibleTimingsError,
         isSeatCountError,
         btnDisplayText,
         date,
         onChangeSource,
         onChangeDestination,
         onChangeFlexibleFromDate,
         onChangeFlexibleToDate,
         onIncrementSeats,
         onDecrementSeats,
         onChangeSeats,
         toggleIsFlexible,
         onIncrementLaguage,
         onDecrementLaguage,
         onChangeLaguage,
         onChangeDate,
         onSubmit
      } = this
      const formProps = {
         isSourceError,
         errorMsg,
         sourcePlace,
         isDestinationError,
         destinationPlace,
         isFlexible,
         seatCount,
         laguageCount,
         isTravelDateError,
         isFlexibleTimingsError,
         date,
         btnDisplayText,
         isSeatCountError,
         onChangeSource,
         onChangeDestination,
         onChangeFlexibleFromDate,
         onChangeFlexibleToDate,
         onIncrementSeats,
         onDecrementSeats,
         onChangeSeats,
         toggleIsFlexible,
         onIncrementLaguage,
         onDecrementLaguage,
         onChangeLaguage,
         onChangeDate,
         onSubmit
      }

      return (
         <RideRequestForm
            {...formProps}
            isLoading={
               this.requestStore.getRideRequestAPIStatus === API_FETCHING
            }
         />
      )
   }
}

export { RideRequestRoute }
