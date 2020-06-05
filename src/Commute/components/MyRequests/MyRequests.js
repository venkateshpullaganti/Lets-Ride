import React, { Component } from 'react'
import { observable, computed, action } from 'mobx'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import { Pagination } from '../../../Common/components/Pagination'

import {
   Heading,
   AddRequestBtn,
   TotalPages,
   TableFooter
} from '../../styledComponents'
import strings from '../../i18n/strings.json'
import {
   RIDE_TABLE_COLUMNS,
   ASSET_TABLE_COLUMNS
} from '../../constants/MyRequestsConstants'
import {
   RIDE_REQUEST_PATH,
   ASSET_TRANSPORT_REQUEST_PATH,
   PAGINATION_LIMIT
} from '../../constants/NavigationConstants'

import { Table } from '../Table'
import { FilterBar } from '../FilterBar'
import { Selector } from '../Selector'

import {
   RequestsContainer,
   Navigator,
   NavBtn,
   RequestTable,
   RequestsHeader,
   Col
} from './styledComponents'
import { Item } from './Item'

@inject('commuteStore')
@observer
class MyRequests extends Component {
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
      return Math.ceil(
         this.commuteStore.totalMyAssetRequests / PAGINATION_LIMIT
      )
   }
   get totalRidePages() {
      return Math.ceil(this.commuteStore.totalMyRideRequests / PAGINATION_LIMIT)
   }
   get rideTaskCount() {
      return this.commuteStore.totalMyRideRequests
   }
   get assetTaskCount() {
      return this.commuteStore.totalMyAssetRequests
   }

   componentDidMount() {
      this.doMyRideRequestApiCall()
   }

   @action
   showRide = () => {
      this.selectedField = strings.ride
      this.doMyRideRequestApiCall()
   }

   @action
   showAsset = () => {
      this.selectedField = strings.asset
      this.doMyAssetsRequestApiCall()
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
      this.doMyRideRequestApiCall()
   }
   handleAssetPageClick = selectedPage => {
      this.assetCurrentPage = selectedPage
      this.assetPaginationOffset =
         (this.assetCurrentPage - 1) * PAGINATION_LIMIT

      this.doMyAssetsRequestApiCall()
   }

   doMyAssetsRequestApiCall = () => {
      const responseObj = {}

      const paginationObj = {
         limit: PAGINATION_LIMIT,
         offset: this.assetPaginationOffset,
         status: this.assetSelectedFilter,
         sort_key: this.assetSelectedSort,
         sort_value: 'ASC'
      }
      this.commuteStore.getMyAssetsRequests(responseObj, paginationObj)
   }

   doMyRideRequestApiCall = () => {
      const responseObj = {}

      const paginationObj = {
         limit: PAGINATION_LIMIT,
         offset: this.ridePaginationOffset,
         status: this.rideSelectedFilter,
         sort_key: this.rideSelectedSort,
         sort_value: 'ASC'
      }
      this.commuteStore.getMyRideRequests(responseObj, paginationObj)
   }

   renderRequests = () => {
      return this.commuteStore.rideRequests.map(request => (
         <Item key={request.id} request={request} />
      ))
   }
   renderRequestsHeader = () => {
      const { filterByStatus } = this.props
      return (
         <RequestsHeader key={'Table Header'}>
            {RIDE_TABLE_COLUMNS.map(item => (
               <Col key={item}>{item}</Col>
            ))}
            <Selector
               dropdownName={'STATUS'}
               options={['Active', 'Expired']}
               onChange={filterByStatus}
            />
         </RequestsHeader>
      )
   }

   renderRidesTable = () => {
      return (
         <>
            <FilterBar
               taskCount={this.rideTaskCount ?? 10}
               onChangeSort={this.onChangeRideSort}
               onChangeFilter={this.onChangeRideFilter}
               filterOptions={this.commuteStore.myRideRequestsFilterOptions}
               sortOptions={this.commuteStore.myRideRequestsSortOptions}
            />
            <RequestTable>
               {this.renderRequestsHeader()}
               {this.renderRequests()}
            </RequestTable>
            <TableFooter>
               <AddRequestBtn onClick={this.navigateToRideRequestForm}>
                  {strings.addRequest}
               </AddRequestBtn>
               <TotalPages>{`Page ${this.rideCurrentPage} of ${this.totalRidePages}`}</TotalPages>
               <Pagination
                  handlePageClick={this.handleRidePageClick}
                  totalPages={this.totalRidePages}
                  currentPage={this.rideCurrentPage}
               />
            </TableFooter>
         </>
      )
   }

   renderAssetsTable = () => {
      return (
         <Table
            headerItems={ASSET_TABLE_COLUMNS}
            tableData={this.commuteStore.assetRequests}
            onClickAddRequest={this.navigateToAssetRequestForm}
            totalAssetPages={this.totalAssetPages}
            currentPage={this.assetCurrentPage}
            handleAssetPageClick={this.handleAssetPageClick}
            taskCount={this.assetTaskCount}
            onChangeSort={this.onChangeAssetSort}
            onChangeFilter={this.onChangeAssetFilter}
            filterOptions={this.commuteStore.myAssetRequestsFilterOptions}
            sortOptions={this.commuteStore.myAssetRequestsSortOptions}
         />
      )
   }

   renderSelectedTable = () => {
      if (this.selectedField === strings.ride) {
         return (
            <LoadingWrapperWithFailure
               apiStatus={this.commuteStore.getMyRideRequestsAPIStatus}
               onRetryClick={this.doMyRideRequestApiCall}
               apiError={this.commuteStore.getMyRideRequestsAPIError}
               renderSuccessUI={this.renderRidesTable}
               isNoData={this.commuteStore.myRideRequests.length === 0}
            />
         )
      }
      return (
         <LoadingWrapperWithFailure
            apiStatus={this.commuteStore.getMyAssetRequestsAPIStatus}
            onRetryClick={this.doMyAssetsRequestApiCall}
            apiError={this.commuteStore.getMyAssetRequestsAPIError}
            renderSuccessUI={this.renderAssetsTable}
            isNoData={this.commuteStore.myAssetRequests.length === 0}
         />
      )
   }

   render() {
      return (
         <RequestsContainer>
            <Navigator>
               <NavBtn
                  isSelected={this.selectedField === strings.ride}
                  onClick={this.showRide}
               >
                  {strings.ride}
               </NavBtn>
               <NavBtn
                  isSelected={this.selectedField === strings.asset}
                  onClick={this.showAsset}
               >
                  {strings.asset}
               </NavBtn>
            </Navigator>
            {this.renderSelectedTable()}
         </RequestsContainer>
      )
   }
}

export default withRouter(MyRequests)

// onChangeRideFilter = selected => {
//    console.log(selected)
// }
// onChangeRideSort = v => {
//    console.log(v)
// }
// onChangeAssetFilter = selected => {
//    console.log(selected)
// }
// onChangeAssetSort = v => {
//    console.log(v)
// }
