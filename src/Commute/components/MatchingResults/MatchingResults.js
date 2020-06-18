import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

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
import {
   RIDE_REQUEST_PATH,
   ASSET_TRANSPORT_REQUEST_PATH,
   PAGINATION_LIMIT
} from '../../constants/NavigationConstants'

import { TableTabBar } from '../Common/Components/TableTabBar'

import { RidesTable } from './RidesTable'
import { AssetsTable } from './AssetsTable'
import { MatchingResultsRoot } from './styledComponents'

@observer
class MatchingResults extends Component {
   @observable selectedField

   assetCurrentPage
   assetPaginationOffset

   rideCurrentPage
   ridePaginationOffset = 0

   assetSelectedFilter
   rideSelectedFilter
   assetSelectedSort
   rideSelectedSort

   constructor(props) {
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

   onChangeRideFilter = selectedFilter => {
      this.rideSelectedFilter = selectedFilter
   }
   onChangeRideSort = selectedSort => {
      this.rideSelectedSort = selectedSort
   }

   onChangeAssetFilter = selectedFilter => {
      this.assetSelectedFilter = selectedFilter
   }
   onChangeAssetSort = selectedSort => {
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

   handleRidePageClick = selectedPage => {
      this.rideCurrentPage = selectedPage
      this.ridePaginationOffset = (this.rideCurrentPage - 1) * PAGINATION_LIMIT
      this.doMatchingResultsApiCall(this.ridePaginationOffset)
   }
   handleAssetPageClick = selectedPage => {
      this.assetCurrentPage = selectedPage
      this.assetPaginationOffset =
         (this.assetCurrentPage - 1) * PAGINATION_LIMIT

      this.doMatchingResultsApiCall(this.assetPaginationOffset)
   }

   doMatchingResultsApiCall = offset => {
      const responseObj = {}

      const paginationObj = {
         limit: PAGINATION_LIMIT,
         offset: offset || 0,
         status: this.rideSelectedFilter,
         sort_key: this.rideSelectedSort,
         sort_value: 'ASC'
      }
      this.commuteStore.getMatchingResults(responseObj, paginationObj)
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
      if (this.selectedField === strings.ride) {
         return (
            <LoadingWrapperWithFailure
               apiStatus={this.commuteStore.getMatchingResultsAPIStatus}
               onRetryClick={this.doMatchingResultsApiCall}
               apiError={this.commuteStore.getMatchingResultsAPIError}
               renderSuccessUI={this.renderRidesTable}
               isNoData={this.commuteStore.totalMatchingRides === 0}
            />
         )
      }
      return (
         <LoadingWrapperWithFailure
            apiStatus={this.commuteStore.getMatchingResultsAPIStatus}
            onRetryClick={this.doMyAssetsRequestApiCall}
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
