import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { observer } from 'mobx-react'

import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'

import strings from '../../i18n/strings.json'
import { RIDE, ASSET } from '../../constants/CommuteConstants'
import {
   MATCHING_ASSETS_COLUMN,
   MATCHING_RIDES_COLUMNS,
   SORT_OPTIONS,
   FILTER_OPTIONS
} from '../../constants/MyRequestsConstants'
import {
   goToAssetRequestPage,
   goToRideRequestPage
} from '../../utils/NavigationUtils/NavigationUtils'

import { TableTabBar } from '../Common/Components/TableTabBar'

import { RidesTable } from './RidesTable'
import { AssetsTable } from './AssetsTable'
import { MatchingResultsRoot } from './styledComponents'
import { OptionType } from '../types'
import { CommuteStore } from '../../stores/CommuteStore'
import { PAGINATION_LIMIT } from '../../constants/NavigationConstants'

interface MatchingResultsProps extends RouteComponentProps {
   commuteStore: CommuteStore
}

@observer
class MatchingResults extends Component<MatchingResultsProps> {
   @observable selectedField!: string

   assetCurrentPage!: number
   assetPaginationOffset!: number

   rideCurrentPage!: number
   ridePaginationOffset: number = 0

   assetSelectedFilter!: OptionType | null
   rideSelectedFilter!: OptionType | null
   assetSelectedSort!: OptionType | null
   rideSelectedSort!: OptionType | null

   constructor(props: MatchingResultsProps) {
      super(props)
      this.init()
   }
   init = () => {
      this.selectedField = strings.ride
      this.rideCurrentPage = 1
      this.assetCurrentPage = 1
      this.assetPaginationOffset = 0
      this.ridePaginationOffset = 0

      this.assetSelectedFilter = null
      this.rideSelectedFilter = null
      this.assetSelectedSort = null
      this.rideSelectedSort = null
   }
   get commuteStore() {
      return this.props.commuteStore
   }
   get totalAssetPages() {
      return Math.ceil(this.commuteStore.totalMatchingAssets / PAGINATION_LIMIT)
   }
   get totalRidePages() {
      return Math.ceil(this.commuteStore.totalMatchingRides / PAGINATION_LIMIT)
   }
   get rideTaskCount() {
      return this.commuteStore.totalMatchingRides
   }
   get assetTaskCount() {
      return this.commuteStore.totalMatchingAssets
   }

   componentDidMount() {
      this.doMatchingResultsApiCall()
   }

   @action
   showRide = () => {
      this.selectedField = RIDE
      // this.doMatchingResultsApiCall()
   }

   @action
   showAsset = () => {
      this.selectedField = ASSET
      // this.doMatchingResultsApiCall()
   }

   onChangeRideFilter = (selectedFilter: OptionType) => {
      this.rideSelectedFilter = selectedFilter
   }
   onChangeRideSort = (selectedSort: OptionType) => {
      this.rideSelectedSort = selectedSort
   }

   onChangeAssetFilter = (selectedFilter: OptionType) => {
      this.assetSelectedFilter = selectedFilter
   }
   onChangeAssetSort = (selectedSort: OptionType) => {
      this.assetSelectedSort = selectedSort
   }

   navigateToRideRequestForm = () => {
      const { history } = this.props
      goToRideRequestPage(history)
   }
   navigateToAssetRequestForm = () => {
      const { history } = this.props
      goToAssetRequestPage(history)
   }

   handleRidePageClick = (selectedPage: number) => {
      this.rideCurrentPage = selectedPage
      this.ridePaginationOffset = (this.rideCurrentPage - 1) * PAGINATION_LIMIT
      this.doMatchingResultsApiCall(this.ridePaginationOffset)
   }
   handleAssetPageClick = (selectedPage: number) => {
      this.assetCurrentPage = selectedPage
      this.assetPaginationOffset =
         (this.assetCurrentPage - 1) * PAGINATION_LIMIT

      this.doMatchingResultsApiCall(this.assetPaginationOffset)
   }
   getValue = (option: OptionType | null): string => {
      if (option) return option.value
      return ''
   }

   doMatchingResultsApiCall = (offset?: number) => {
      const paginationObj = {
         limit: PAGINATION_LIMIT,
         offset: offset || 0,
         status: this.getValue(this.rideSelectedFilter),
         sort_key: this.getValue(this.rideSelectedSort),
         sort_value: 'ASC'
      }
      this.commuteStore.getMatchingResults(paginationObj)
   }

   renderRidesTable = () => {
      const { matchingRideRequests } = this.commuteStore

      return (
         <RidesTable
            headerItems={MATCHING_RIDES_COLUMNS}
            tableData={matchingRideRequests}
            onClickAddRequest={this.navigateToRideRequestForm}
            totalPages={this.totalRidePages}
            currentPage={this.rideCurrentPage}
            handleAssetPageClick={this.handleRidePageClick}
            taskCount={this.rideTaskCount}
            onChangeSort={this.onChangeRideSort}
            onChangeFilter={this.onChangeRideFilter}
            filterOptions={FILTER_OPTIONS}
            sortOptions={SORT_OPTIONS}
            renderTable={this.doMatchingResultsApiCall}
         />
      )
   }

   renderAssetsTable = () => {
      const { matchingAssetReqests } = this.commuteStore
      return (
         <AssetsTable
            headerItems={MATCHING_ASSETS_COLUMN}
            tableData={matchingAssetReqests}
            onClickAddRequest={this.navigateToAssetRequestForm}
            totalPages={this.totalAssetPages}
            currentPage={this.assetCurrentPage}
            handleAssetPageClick={this.handleAssetPageClick}
            taskCount={this.assetTaskCount}
            onChangeSort={this.onChangeAssetSort}
            onChangeFilter={this.onChangeAssetFilter}
            filterOptions={FILTER_OPTIONS}
            sortOptions={SORT_OPTIONS}
            renderTable={this.doMatchingResultsApiCall}
         />
      )
   }

   renderSelectedTable = () => {
      const {
         getMatchingResultsAPIStatus,
         getMatchingResultsAPIError,
         totalMatchingRides
      } = this.commuteStore
      if (this.selectedField === strings.ride) {
         return (
            <LoadingWrapperWithFailure
               apiStatus={getMatchingResultsAPIStatus}
               onRetryClick={this.doMatchingResultsApiCall}
               apiError={getMatchingResultsAPIError}
               renderSuccessUI={this.renderRidesTable}
               isNoData={totalMatchingRides === 0}
            />
         )
      }
      return (
         <LoadingWrapperWithFailure
            apiStatus={this.commuteStore.getMatchingResultsAPIStatus}
            onRetryClick={this.doMatchingResultsApiCall}
            apiError={this.commuteStore.getMatchingResultsAPIError}
            renderSuccessUI={this.renderAssetsTable}
            isNoData={this.commuteStore.totalMatchingAssets === 0}
         />
      )
   }

   render() {
      return (
         <MatchingResultsRoot>
            <TableTabBar
               selected={this.selectedField}
               onClickRide={this.showRide}
               onClickAsset={this.showAsset}
            />
            {this.renderSelectedTable()}
         </MatchingResultsRoot>
      )
   }
}

export default withRouter(MatchingResults)
