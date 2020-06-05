import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'

import strings from '../../i18n/strings.json'
import {
   MATCHING_ASSETS_COLUMN,
   MATCHING_RIDES_COLUMNS,
   SORT_OPTIONS,
   FILTER_OPTIONS
} from '../../constants/MyRequestsConstants'
import {
   RIDE_REQUEST_PATH,
   ASSET_TRANSPORT_REQUEST_PATH,
   PAGINATION_LIMIT
} from '../../constants/NavigationConstants'

import { RidesTable } from './RidesTable'
import { AssetsTable } from './AssetsTable'

import { MatchingResultsRoot, TabBar, TabBtn } from './styledComponents'

const ZERO = 0

@inject('commuteStore')
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
      this.rideCurrentPage = 1
      this.assetCurrentPage = 1
      this.assetPaginationOffset = 0
      this.ridePaginationOffset = 0

      this.assetSelectedFilter = null
      this.rideSelectedFilter = null
      this.assetSelectedSort = null
      this.rideSelectedSort = null
   }
   init = () => {
      this.selectedField = strings.ride
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
      this.selectedField = strings.ride
      // this.doMatchingResultsApiCall()
   }

   @action
   showAsset = () => {
      this.selectedField = strings.asset
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
      history.push(RIDE_REQUEST_PATH)
   }
   navigateToAssetRequestForm = () => {
      const { history } = this.props
      history.push(ASSET_TRANSPORT_REQUEST_PATH)
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
         offset: offset || this.ridePaginationOffset,
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
            <TabBar>
               <TabBtn
                  isSelected={this.selectedField === strings.ride}
                  onClick={this.showRide}
               >
                  {strings.ride}
               </TabBtn>
               <TabBtn
                  isSelected={this.selectedField === strings.asset}
                  onClick={this.showAsset}
               >
                  {strings.asset}
               </TabBtn>
            </TabBar>
            {this.renderSelectedTable()}
         </MatchingResultsRoot>
      )
   }
}

export default withRouter(MatchingResults)
