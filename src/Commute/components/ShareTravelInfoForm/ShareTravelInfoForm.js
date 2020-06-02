import React, { Component } from 'react'
import { observer } from 'mobx-react'

import Select from 'react-select'

import 'react-datepicker/dist/react-datepicker.css'

import {
   ASSET_SENSITIVITY_OPTIONS,
   ASSET_TYPES
} from '../../constants/CommuteConstants'

import { Button } from '../../../Common/components/Button'
import { Input } from '../../../Common/components/Input'
import { DateAndTimePicker } from '../../../Common/components/DateAndTimePicker'
import { Selector } from '../../../Common/components/Selector'

import { Heading, Label } from '../../styledComponents'
import strings from '../../i18n/strings.json'

import { Header } from '../Header'
import { Counter } from '../Counter'
import { FlexibleTimings } from '../FlexibleTimings'

import { AssetRequest, Form } from './styledComponents'

@observer
class ShareTravelInfoForm extends Component {
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
         onIncrementAssetsCount,
         onDecrementAssetsCount,
         onChangeAssetsCount,
         toggleIsFlexible,
         isFlexible,
         assetCount,
         isLoading,
         onChangeDate,
         isSeatCountError,
         btnDisplayText,
         onSubmit,
         onChangeAssetType,
         selectedAssetType,
         onChangeAssetSensitivity,
         selectedAssetSensitivity,
         isWhomToDeliverError,
         onChangeWhomToDeliver,
         whomToDeliver
      } = this.props

      return (
         <AssetRequest>
            <Header />
            <Form onSubmit={onSubmit}>
               <Heading>{strings.assetRequestFormHeading}</Heading>
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
                  labelText={strings.noOfAssets}
                  count={assetCount}
                  onIncrement={onIncrementAssetsCount}
                  onDecrement={onDecrementAssetsCount}
                  onChange={onChangeAssetsCount}
                  isError={isSeatCountError}
                  errorMsg={errorMsg}
               />
               <Selector
                  options={ASSET_TYPES}
                  label={strings.assetType}
                  placeholder={strings.selectAssetType}
                  value={selectedAssetType}
                  onChange={onChangeAssetType}
               />
               <Selector
                  options={ASSET_SENSITIVITY_OPTIONS}
                  label={strings.assetSensitivity}
                  placeholder={strings.selectAssetSensitivity}
                  value={selectedAssetSensitivity}
                  onChange={onChangeAssetSensitivity}
               />
               <Input
                  type={'text'}
                  labelText={strings.whomToDeliver}
                  id={'whomToDeliver'}
                  isError={isWhomToDeliverError}
                  onChange={onChangeWhomToDeliver}
                  errorMsg={errorMsg}
                  isRequired={true}
                  value={whomToDeliver}
                  placeholder={strings.nameMobile}
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

export { ShareTravelInfoForm }

const options = [
   { value: 'chocolate', label: 'Chocolate' },
   { value: 'strawberry', label: 'Strawberry' },
   { value: 'vanilla', label: 'Vanilla' }
]
