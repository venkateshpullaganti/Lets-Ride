import React, { Component } from 'react'
import { observer } from 'mobx-react'
import moment from 'moment'
import { observable, computed } from 'mobx'

import 'react-datepicker/dist/react-datepicker.css'

import { TRAVEL_MEDIUM_OPTIONS } from '../../constants/CommuteConstants'

import { Button } from '../../../Common/components/Button'
import { Input } from '../../../Common/components/Input'
import { DateAndTimePicker } from '../../../Common/components/DateAndTimePicker'
import { Selector } from '../../../Common/components/Selector'

import { Heading, Label } from '../../styledComponents'
import strings from '../../i18n/strings.json'

import { Header } from '../Header'
import { Counter } from '../Counter'
import { FlexibleTimings } from '../FlexibleTimings'
import withHeader from '../Common/hocs/withHeader'

import { AssetRequest, Form } from './styledComponents'

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
      this.travelDate = moment(dateObj).format('YYYY-MM-DD hh:mm A')
   }

   onChangeFlexibleFromDate = date => {
      this.flexibleFromDate = moment(date).format('YYYY-MM-DD hh:mm A')
   }
   onChangeFlexibleToDate = date => {
      this.flexibleToDate = moment(date).format('YYYY-MM-DD hh:mm A')
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
         console.log('data', data)

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

   render() {
      const { isLoading, btnDisplayText } = this.props

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
                  value={this.travelMedium}
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
                  displayText={btnDisplayText}
                  disabled={isLoading}
               />
            </Form>
         </AssetRequest>
      )
   }
}

export default withHeader(ShareTravelInfoForm)
