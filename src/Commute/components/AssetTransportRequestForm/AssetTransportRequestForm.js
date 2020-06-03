import React, { Component } from 'react'
import { observer } from 'mobx-react'
import moment from 'moment'
import { observable, computed } from 'mobx'

import 'react-datepicker/dist/react-datepicker.css'

import {
   ASSET_SENSITIVITY_OPTIONS,
   ASSET_TYPES
} from '../../constants/CommuteConstants'

import { Button } from '../../../Common/components/Button'
import { Input } from '../../../Common/components/Input'
import { DateAndTimePicker } from '../../../Common/components/DateAndTimePicker'
import { Selector } from '../../../Common/components/Selector'

import { Heading } from '../../styledComponents'
import strings from '../../i18n/strings.json'

import { Header } from '../Header'
import { Counter } from '../Counter'
import { FlexibleTimings } from '../FlexibleTimings'

import { AssetRequest, Form } from './styledComponents'

@observer
class AssetTransportRequestForm extends Component {
   @observable destinationPlace
   @observable sourcePlace
   @observable errorMsg
   @observable isFlexible
   @observable assetCount

   @observable whomToDeliver
   @observable selectedAssetType
   @observable selectedAssetSensitivity
   @observable assetTypeOthers

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
      this.selectedAssetSensitivity = ''
      this.selectedAssetType = ''
      this.whomToDeliver = ''
      this.assetTypeOthers = ''
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
   onChangeAssetTypeOthers = event => {
      this.assetTypeOthers = event.target.value
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
      } else if (assetCount === 0) {
         this.errorMsg = strings.assetCountError
      } else if (this.selectedAssetType === '') {
         this.errorMsg = strings.assetTypeError
      } else if (this.selectedAssetSensitivity === '') {
         this.errorMsg = strings.assetSensitivityError
      } else if (this.whomToDeliver === '') {
         this.errorMsg = strings.whomToDeliverError
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
            selectedAssetSensitivity,
            selectedAssetType,
            whomToDeliver,
            assetTypeOthers
         } = this

         const formData = {
            sourcePlace,
            destinationPlace,
            isFlexible,
            flexibleFromDate,
            flexibleToDate,
            assetCount,
            travelDate,
            selectedAssetSensitivity,
            selectedAssetType,
            whomToDeliver,
            assetTypeOthers
         }

         onSubmit(formData)
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
      return this.errorMsg === strings.assetCountError
   }
   @computed
   get isAssetSensitivityError() {
      return this.errorMsg === strings.assetSensitivityError
   }
   @computed
   get isAssetTypeError() {
      return this.errorMsg === strings.assetTypeError
   }
   @computed
   get isWhomToDeliverError() {
      return this.errorMsg === strings.whomToDeliverError
   }

   onChangeAssetType = selectedType => {
      this.selectedAssetType = selectedType.value
   }
   onChangeAssetSensitivity = selectedSensitivity => {
      this.selectedAssetSensitivity = selectedSensitivity.value
   }
   onChangeWhomToDeliver = event => {
      this.whomToDeliver = event.target.value
   }

   render() {
      const { isLoading, btnDisplayText } = this.props

      return (
         <AssetRequest>
            <Header />
            <Form onSubmit={this.onSubmit}>
               <Heading>{strings.assetRequestFormHeading}</Heading>
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
               <Counter
                  labelText={strings.noOfAssets}
                  count={this.assetCount}
                  onIncrement={this.onIncrementAssetsCount}
                  onDecrement={this.onDecrementAssetsCount}
                  onChange={this.onChangeAssetsCount}
                  isError={this.isSeatCountError}
                  errorMsg={this.errorMsg}
               />
               <Selector
                  options={ASSET_TYPES}
                  label={strings.assetType}
                  placeholder={strings.selectAssetType}
                  value={this.selectedAssetType}
                  onChange={this.onChangeAssetType}
                  isRequired={true}
                  isError={this.isAssetTypeError}
                  errorMsg={this.errorMsg}
               />
               <Input
                  type={'text'}
                  labelText={strings.assetTypeOthers}
                  id={'assetTypeOthers'}
                  onChange={this.onChangeAssetTypeOthers}
                  shouldShow={this.selectedAssetType === 'OTHERS'}
                  value={this.assetTypeOthers}
                  placeholder={strings.assetTypeOthersPlaceholder}
               />
               <Selector
                  options={ASSET_SENSITIVITY_OPTIONS}
                  label={strings.assetSensitivity}
                  placeholder={strings.selectAssetSensitivity}
                  value={this.selectedAssetSensitivity}
                  onChange={this.onChangeAssetSensitivity}
                  isRequired={true}
                  isError={this.isAssetSensitivityError}
                  errorMsg={this.errorMsg}
               />
               <Input
                  type={'text'}
                  labelText={strings.whomToDeliver}
                  id={'whomToDeliver'}
                  isError={this.isWhomToDeliverError}
                  onChange={this.onChangeWhomToDeliver}
                  errorMsg={this.errorMsg}
                  isRequired={true}
                  value={this.whomToDeliver}
                  placeholder={strings.nameMobile}
               />

               <Button
                  isLoading={this.isLoading}
                  displayText={btnDisplayText}
                  disabled={isLoading}
               />
            </Form>
         </AssetRequest>
      )
   }
}

export { AssetTransportRequestForm }

const options = [
   { value: 'chocolate', label: 'Chocolate' },
   { value: 'strawberry', label: 'Strawberry' },
   { value: 'vanilla', label: 'Vanilla' }
]
