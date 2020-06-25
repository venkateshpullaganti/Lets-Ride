import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable, computed, action, reaction } from 'mobx'

import 'react-datepicker/dist/react-datepicker.css'

import {
   ASSET_SENSITIVITY_OPTIONS,
   ASSET_TYPES
} from '../../constants/CommuteConstants'
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
import { OptionType, FormDataType } from '../types'

type AssetTransportRequestFormProps = {
   onSubmit: (data: FormDataType) => void
   apiStatus: number
}

@observer
class AssetTransportRequestForm extends Component<
   AssetTransportRequestFormProps
> {
   @observable destinationPlace!: string
   @observable sourcePlace!: string
   @observable errorMsg!: string | null
   @observable isFlexible!: boolean
   @observable assetCount!: number

   @observable whomToDeliver!: string
   @observable selectedAssetType!: null | string
   @observable selectedAssetSensitivity!: string
   @observable assetTypeOthers!: string
   @observable date!: Date

   travelDate!: string
   flexibleFromDate!: string
   flexibleToDate!: string

   constructor(props: AssetTransportRequestFormProps) {
      super(props)
      this.init()
   }

   @action
   init = (): void => {
      this.assetCount = 0
      this.isFlexible = false
      this.destinationPlace = ''
      this.sourcePlace = ''
      this.errorMsg = null
      this.travelDate = ''
      this.flexibleFromDate = ''
      this.flexibleToDate = ''
      this.selectedAssetSensitivity = ''
      this.selectedAssetType = null
      this.whomToDeliver = ''
      this.assetTypeOthers = ''
      this.date = new Date()
   }
   onChangeSource = (event: React.ChangeEvent<HTMLInputElement>): void => {
      this.sourcePlace = event.target.value
   }
   onChangeDestination = (event: React.ChangeEvent<HTMLInputElement>): void => {
      this.destinationPlace = event.target.value
   }
   toggleIsFlexible = (): void => {
      this.isFlexible = !this.isFlexible
   }
   onChangeDate = (dateObj: Date): void => {
      this.travelDate = DateFormatter(dateObj)
   }

   onChangeFlexibleFromDate = (dateObj: Date): void => {
      this.flexibleFromDate = DateFormatter(dateObj)
   }
   onChangeFlexibleToDate = (dateObj: Date): void => {
      this.flexibleToDate = DateFormatter(dateObj)
   }

   onIncrementAssetsCount = (): void => {
      this.assetCount++
   }

   onDecrementAssetsCount = (): void => {
      if (this.assetCount > 0) this.assetCount--
   }
   onChangeAssetsCount = (event: React.ChangeEvent<HTMLInputElement>): void => {
      this.assetCount = parseInt(event.target.value)
   }
   onChangeAssetTypeOthers = (
      event: React.ChangeEvent<HTMLInputElement>
   ): void => {
      this.assetTypeOthers = event.target.value
   }

   onSubmit = (event: React.MouseEvent<HTMLFormElement>): void => {
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
   get isSourceError(): boolean {
      return this.errorMsg === strings.sourcePlaceError
   }
   @computed
   get isDestinationError(): boolean {
      return this.errorMsg === strings.destinationPlaceError
   }
   @computed
   get isTravelDateError(): boolean {
      return this.errorMsg === strings.travelDateError
   }
   @computed
   get isFlexibleTimingsError(): boolean {
      return this.errorMsg === strings.flexibleTimingsError && this.isFlexible
   }
   @computed
   get isSeatCountError(): boolean {
      return this.errorMsg === strings.assetCountError
   }
   @computed
   get isAssetSensitivityError(): boolean {
      return this.errorMsg === strings.assetSensitivityError
   }
   @computed
   get isAssetTypeError(): boolean {
      return this.errorMsg === strings.assetTypeError
   }
   @computed
   get isWhomToDeliverError(): boolean {
      return this.errorMsg === strings.whomToDeliverError
   }

   onChangeAssetType = (selectedType: OptionType) => {
      this.selectedAssetType = selectedType.value
   }
   onChangeAssetSensitivity = (selectedSensitivity: OptionType) => {
      this.selectedAssetSensitivity = selectedSensitivity.value
   }
   onChangeWhomToDeliver = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.whomToDeliver = event.target.value
   }
   successReaction = reaction(
      () => {
         return this.props.apiStatus === API_SUCCESS
      },
      bool => {
         this.init()
      }
   )

   render() {
      const { apiStatus } = this.props
      const isLoading = apiStatus === API_FETCHING

      return (
         <AssetRequest>
            <Form onSubmit={this.onSubmit}>
               <Heading>{strings.assetRequestFormHeading}</Heading>
               <Input
                  type={'text'}
                  labelText={strings.fromText}
                  id={'src Place'}
                  isError={this.isSourceError}
                  onChange={this.onChangeSource}
                  errorMsg={this.errorMsg}
                  isRequired={true}
                  value={this.sourcePlace}
               />
               <Input
                  type={'text'}
                  labelText={strings.toText}
                  id={'dest Place'}
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
                  value={{ label: this.selectedAssetType }}
                  onChange={this.onChangeAssetType}
                  isRequired={true}
                  isError={this.isAssetTypeError}
                  errorMsg={this.errorMsg}
               />
               <Input
                  type={'text'}
                  labelText={strings.assetTypeOthers}
                  id={'asset TypeOthers'}
                  onChange={this.onChangeAssetTypeOthers}
                  shouldShow={false}
                  value={this.assetTypeOthers}
                  placeholder={strings.assetTypeOthersPlaceholder}
               />
               <Selector
                  options={ASSET_SENSITIVITY_OPTIONS}
                  label={strings.assetSensitivity}
                  placeholder={strings.selectAssetSensitivity}
                  value={{
                     label: this.selectedAssetSensitivity
                  }}
                  onChange={this.onChangeAssetSensitivity}
                  isRequired={true}
                  isError={this.isAssetSensitivityError}
                  errorMsg={this.errorMsg}
               />
               <Input
                  type={'text'}
                  labelText={strings.whomToDeliver}
                  id={'whom ToDeliver'}
                  isError={this.isWhomToDeliverError}
                  onChange={this.onChangeWhomToDeliver}
                  errorMsg={this.errorMsg}
                  isRequired={true}
                  value={this.whomToDeliver}
                  placeholder={strings.nameMobile}
               />

               <Button
                  isLoading={isLoading}
                  displayText={strings.requestBtnText}
               />
            </Form>
         </AssetRequest>
      )
   }
}

export { AssetTransportRequestForm }
