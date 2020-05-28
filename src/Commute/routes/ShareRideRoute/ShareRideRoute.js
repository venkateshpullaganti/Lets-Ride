import React, { Component } from 'react'
import moment from 'moment'

import { ShareRideForm } from '../../components/ShareRideForm'
import strings from '../../i18n/strings.json'

import { observer, inject } from 'mobx-react'
import { observable, computed } from 'mobx'

@inject('shareStore')
@observer
class ShareRideRoute extends Component {
   @observable destinationPlace
   @observable sourcePlace
   @observable errorMsg
   @observable isFlexible
   @observable seatCount
   @observable laguageCount
   @observable isLoading
   travelDate
   flexibleFromDate
   flexibleToDate

   constructor(props) {
      super(props)
      this.init()
      this.onSubmit = this.onSubmit.bind(this)
   }

   init = () => {
      this.seatCount = 0
      this.laguageCount = 0
      this.isFlexible = false
      this.destinationPlace = ''
      this.sourcePlace = ''
      this.errorMsg = null
      this.isLoading = false
   }

   get shareStore() {
      return this.props.shareStore
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

      const { sourcePlace, destinationPlace } = this
      if (sourcePlace === '') {
         this.errorMsg = strings.sourcePlaceError
      } else if (destinationPlace === '') {
         this.errorMsg = strings.destinationPlaceError
      } else {
         this.errorMsg = null
         this.doNetworkCall()
      }
   }

   doNetworkCall = () => {
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
      this.shareStore.rideShare(requestObj, this.onSuccess, this.onFailure)
   }
   onSuccess = () => {
      this.isLoading = false
      alert('successfully added')
      this.init()
   }
   onFailure = error => {
      this.isLoading = false
   }

   @computed
   get isSourceError() {
      return this.errorMsg === strings.sourcePlaceError
   }
   @computed
   get isDestinationError() {
      return this.errorMsg === strings.destinationPlaceError
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
         isLoading,
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
         isLoading,
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

      return <ShareRideForm {...formProps} />
   }
}

export { ShareRideRoute }
