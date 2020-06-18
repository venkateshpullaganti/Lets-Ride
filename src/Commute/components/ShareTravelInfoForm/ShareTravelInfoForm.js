import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { observable, computed, reaction } from 'mobx'

import 'react-datepicker/dist/react-datepicker.css'

import { TRAVEL_MEDIUM_OPTIONS } from '../../constants/CommuteConstants'

import { DateFormatter } from '../../utils/DateFormatter/DateFormatter'

import { Button } from '../../../Common/components/Button'
import { Input } from '../../../Common/components/Input'
import { DateAndTimePicker } from '../../../Common/components/DateAndTimePicker'
import { Selector } from '../../../Common/components/Selector'

import { Heading } from '../../styledComponents'
import strings from '../../i18n/strings.json'

import { Counter } from '../Counter'
import { FlexibleTimings } from '../FlexibleTimings'

import { AssetRequest, Form } from './styledComponents'
import { API_FETCHING, API_SUCCESS } from '@ib/api-constants'

@observer
class ShareTravelInfoForm extends Component {
   @observable destinationPlace
   @observable sourcePlace
   @observable errorMsg
   @observable isFlexible
   @observable assetCount

   @observable travelMedium

   travelDate
   flexibleFromDate
   flexibleToDate

   @observable date = new Date()
   constructor(props) {
      super(props)
      this.init()
   }

   init = () => {
      this.assetCount = 0
      this.isFlexible = false
      this.destinationPlace = ''
      this.sourcePlace = ''
      this.errorMsg = null
      this.travelDate = ''
      this.flexibleFromDate = ''
      this.flexibleToDate = ''
      this.travelMedium = ''
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

   onIncrementAssetsCount = () => {
      this.assetCount++
   }
   onDecrementAssetsCount = () => {
      if (this.assetCount > 0) this.assetCount--
   }
   onChangeAssetsCount = event => {
      this.assetCount = parseInt(event.target.value)
   }

   onSubmit = event => {
      event.preventDefault()
      const {
         sourcePlace,
         destinationPlace,
         isFlexible,
         flexibleFromDate,
         flexibleToDate,
         assetCount
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
      } else if (this.travelMedium === '') {
         this.errorMsg = strings.travelMediumError
      } else if (assetCount === 0) {
         this.errorMsg = strings.assetCountError
      } else {
         this.errorMsg = null

         // this.doNetworkCalls()  create obj and send to route

         const {
            sourcePlace,
            destinationPlace,
            isFlexible,
            flexibleFromDate,
            flexibleToDate,
            assetCount,
            travelDate,
            travelMedium
         } = this

         const data = {
            sourcePlace,
            destinationPlace,
            isFlexible,
            flexibleFromDate,
            flexibleToDate,
            assetCount,
            travelDate,
            travelMedium
         }

         onSubmit(data)
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
   get isTravelMediumError() {
      return this.errorMsg === strings.travelMediumError
   }
   @computed
   get isAssetCountError() {
      return this.errorMsg === strings.assetCountError
   }

   onChangeAssetSensitivity = selectedSensitivity => {
      this.travelMedium = selectedSensitivity.value
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
      const { apiStatus } = this.props
      const isLoading = apiStatus === API_FETCHING
      return (
         <AssetRequest>
            <Form onSubmit={this.onSubmit}>
               <Heading>{strings.shareTravelInfoHeading}</Heading>
               <Input
                  type={'text'}
                  labelText={strings.fromText}
                  id={'sourcePlace'}
                  isError={this.isSourceError}
                  onChange={this.onChangeSource}
                  errorMsg={this.errorMsg}
                  isRequired={true}
                  value={this.sourcePlace}
               />
               <Input
                  type={'text'}
                  labelText={strings.toText}
                  id={'destination'}
                  isError={this.isDestinationError}
                  onChange={this.onChangeDestination}
                  errorMsg={this.errorMsg}
                  isRequired={true}
                  value={this.destinationPlace}
               />

               <DateAndTimePicker
                  onChange={this.onChangeDate}
                  labelText={strings.dateAndTimeLabel}
                  isError={this.isTravelDateError}
                  errorMsg={this.errorMsg}
                  isRequired={!this.isFlexible}
               />
               <FlexibleTimings
                  isFlexible={this.isFlexible}
                  onChangeFlexibleFromDate={this.onChangeFlexibleFromDate}
                  onChangeFlexibleToDate={this.onChangeFlexibleToDate}
                  toggleIsFlexible={this.toggleIsFlexible}
                  isError={this.isFlexibleTimingsError}
                  errorMsg={this.errorMsg}
               />

               <Selector
                  options={TRAVEL_MEDIUM_OPTIONS}
                  label={strings.travelMedium}
                  placeholder={strings.travelMediumPlaceholder}
                  value={{ label: this.travelMedium }}
                  onChange={this.onChangeAssetSensitivity}
                  isRequired={true}
                  isError={this.isTravelMediumError}
                  errorMsg={this.errorMsg}
               />
               <Counter
                  labelText={strings.assetQuantity}
                  count={this.assetCount}
                  onIncrement={this.onIncrementAssetsCount}
                  onDecrement={this.onDecrementAssetsCount}
                  onChange={this.onChangeAssetsCount}
                  isError={this.isAssetCountError}
                  errorMsg={this.errorMsg}
                  isRequired={true}
               />

               <Button
                  isLoading={isLoading}
                  displayText={strings.shareBtnText}
                  disabled={isLoading}
               />
            </Form>
         </AssetRequest>
      )
   }
}

export { ShareTravelInfoForm }
