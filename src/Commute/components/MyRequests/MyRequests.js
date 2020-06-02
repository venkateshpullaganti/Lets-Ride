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
   ASSET_TRANSPORT_REQUEST_PATH
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

<<<<<<< HEAD
const PAGINATION_LIMIT = 2
=======
const PAGINATION_LIMIT = 16
>>>>>>> cf45a74c092498b617f5fb22d3de1dea1a38b833

@inject('commuteStore')
@observer
class MyRequests extends Component {
   @observable selectedField

   assetCurrentPage
   assetPaginationOffset

   rideCurrentPage
<<<<<<< HEAD
   ridePaginationOffset = 0

   assetSelectedFilter
   rideSelectedFilter
   assetSelectedSort
   rideSelectedSort
=======
   ridePaginationOffset
>>>>>>> cf45a74c092498b617f5fb22d3de1dea1a38b833

   constructor(props) {
      super(props)
      this.init()
<<<<<<< HEAD
      this.rideCurrentPage = 1
      this.assetCurrentPage = 1
      this.assetPaginationOffset = 0
      this.ridePaginationOffset = 0

      this.assetSelectedFilter = null
      this.rideSelectedFilter = null
      this.assetSelectedSort = null
      this.rideSelectedSort = null
=======
      this.onSuccess = this.onSuccess.bind(this)
      this.onFailure = this.onFailure.bind(this)
>>>>>>> cf45a74c092498b617f5fb22d3de1dea1a38b833
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
<<<<<<< HEAD
   get rideTaskCount() {
      return this.commuteStore.totalMyRideRequests
   }
   get assetTaskCount() {
      return this.commuteStore.totalMyAssetRequests
   }

   componentDidMount() {
      this.doMyRideRequestApiCall()
=======

   componentDidMount() {
      this.doNetworkCalls()
   }
   doNetworkCalls = () => {
      this.commuteStore.myRequests({}, this.onSuccess, this.onFailure)
   }

   onSuccess() {
      console.log('success')
   }

   onFailure(error) {
      console.log('failed')
>>>>>>> cf45a74c092498b617f5fb22d3de1dea1a38b833
   }

   @action
   showRide = () => {
      this.selectedField = strings.ride
<<<<<<< HEAD
      this.doMyRideRequestApiCall()
=======
>>>>>>> cf45a74c092498b617f5fb22d3de1dea1a38b833
   }

   @action
   showAsset = () => {
      this.selectedField = strings.asset
<<<<<<< HEAD
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
=======
   }

   onChangeFilter = selected => {
      console.log(selected)
   }
   onChangeSort = v => {
      console.log(v)
>>>>>>> cf45a74c092498b617f5fb22d3de1dea1a38b833
   }

   navigateToRideRequestForm = () => {
      const { history } = this.props
      history.push(RIDE_REQUEST_PATH)
   }
   navigateToAssetRequestForm = () => {
      const { history } = this.props
      history.push(ASSET_TRANSPORT_REQUEST_PATH)
   }

<<<<<<< HEAD
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
=======
   handleAssetPageClick = event => {
      this.assetCurrentPage = event.selected
      this.assetPaginationOffset = this.assetCurrentPage * PAGINATION_LIMIT
      this.doMyAssetsRequestApiCall()
   }
   handleRidePageClick = event => {
      this.rideCurrentPage = event.selected
      this.ridePaginationOffset = this.rideCurrentPage * PAGINATION_LIMIT
      this.doMyRideRequestApiCall()
   }
>>>>>>> cf45a74c092498b617f5fb22d3de1dea1a38b833

   doMyAssetsRequestApiCall = () => {
      const responseObj = {}

      const paginationObj = {
<<<<<<< HEAD
         limit: PAGINATION_LIMIT,
         offset: this.assetPaginationOffset,
         status: this.assetSelectedFilter,
         sort_key: this.assetSelectedSort,
         sort_value: 'ASC'
      }
      this.commuteStore.getMyAssetsRequests(responseObj, paginationObj)
=======
         PAGINATION_LIMIT,
         offset: this.assetPaginationOffset
      }
      this.commuteStore.myAssetsRequests(
         responseObj,
         this.onSuccessAssetApiCall,
         this.onFailureAssetApiCall,
         paginationObj
      )
>>>>>>> cf45a74c092498b617f5fb22d3de1dea1a38b833
   }

   doMyRideRequestApiCall = () => {
      const responseObj = {}

      const paginationObj = {
<<<<<<< HEAD
         limit: PAGINATION_LIMIT,
         offset: this.ridePaginationOffset,
         status: this.rideSelectedFilter,
         sort_key: this.rideSelectedSort,
         sort_value: 'ASC'
      }
      this.commuteStore.getMyRideRequests(responseObj, paginationObj)
   }

=======
         PAGINATION_LIMIT,
         offset: this.ridePaginationOffset
      }
      this.commuteStore.myRideRequests(
         responseObj,
         this.onSuccessRideApiCall,
         this.onFailureRideApiCall,
         paginationObj
      )
   }

   onSuccessAssetApiCall = () => {}
   onFailureAssetApiCall = () => {}

   onSuccessRideApiCall = () => {}
   onFailureRideApiCall = () => {}

>>>>>>> cf45a74c092498b617f5fb22d3de1dea1a38b833
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
<<<<<<< HEAD
            <FilterBar
               taskCount={this.rideTaskCount ?? 10}
               onChangeSort={this.onChangeRideSort}
               onChangeFilter={this.onChangeRideFilter}
               filterOptions={this.commuteStore.myRideRequestsFilterOptions}
               sortOptions={this.commuteStore.myRideRequestsSortOptions}
            />
=======
>>>>>>> cf45a74c092498b617f5fb22d3de1dea1a38b833
            <RequestTable>
               {this.renderRequestsHeader()}
               {this.renderRequests()}
            </RequestTable>
            <TableFooter>
               <AddRequestBtn onClick={this.navigateToRideRequestForm}>
                  {strings.addRequest}
               </AddRequestBtn>
<<<<<<< HEAD
               <TotalPages>{`Page ${this.rideCurrentPage} of ${this.totalRidePages}`}</TotalPages>
               <Pagination
                  handlePageClick={this.handleRidePageClick}
                  totalPages={this.totalRidePages}
                  currentPage={this.rideCurrentPage}
=======
               <TotalPages>{`PAGE 1 of 1`}</TotalPages>
               <Pagination
                  handlePageClick={this.handleRidePageClick}
                  totoalPages={this.totalRidePages}
>>>>>>> cf45a74c092498b617f5fb22d3de1dea1a38b833
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
<<<<<<< HEAD
            currentPage={this.assetCurrentPage}
            handleAssetPageClick={this.handleAssetPageClick}
            taskCount={this.assetTaskCount}
            onChangeSort={this.onChangeAssetSort}
            onChangeFilter={this.onChangeAssetFilter}
            filterOptions={this.commuteStore.myAssetRequestsFilterOptions}
            sortOptions={this.commuteStore.myAssetRequestsSortOptions}
=======
            currentAssetPage={this.assetCurrentPage}
            handleAssetPageClick={this.handleAssetPageClick}
>>>>>>> cf45a74c092498b617f5fb22d3de1dea1a38b833
         />
      )
   }

   renderSelectedTable = () => {
      if (this.selectedField === strings.ride) {
         return (
            <LoadingWrapperWithFailure
<<<<<<< HEAD
               apiStatus={this.commuteStore.getMyRideRequestsAPIStatus}
               onRetryClick={this.doMyRideRequestApiCall}
               apiError={this.commuteStore.getMyRideRequestsAPIError}
               renderSuccessUI={this.renderRidesTable}
               isNoData={this.commuteStore.myRideRequests.length === 0}
=======
               apiStatus={this.commuteStore.getMyRequestsAPIStatus}
               onRetryClick={this.doNetworkCalls}
               apiError={this.commuteStore.getMyRequestsAPIError}
               renderSuccessUI={this.renderRidesTable}
>>>>>>> cf45a74c092498b617f5fb22d3de1dea1a38b833
            />
         )
      }
      return (
         <LoadingWrapperWithFailure
<<<<<<< HEAD
            apiStatus={this.commuteStore.getMyAssetRequestsAPIStatus}
            onRetryClick={this.doMyAssetsRequestApiCall}
            apiError={this.commuteStore.getMyAssetRequestsAPIError}
            renderSuccessUI={this.renderAssetsTable}
            isNoData={this.commuteStore.myAssetRequests.length === 0}
=======
            apiStatus={this.commuteStore.getMyRequestsAPIStatus}
            onRetryClick={this.doNetworkCalls}
            apiError={this.commuteStore.getMyRequestsAPIError}
            renderSuccessUI={this.renderAssetsTable}
>>>>>>> cf45a74c092498b617f5fb22d3de1dea1a38b833
         />
      )
   }

   render() {
      return (
         <RequestsContainer>
            <Heading>{strings.myRequests}</Heading>
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
<<<<<<< HEAD

=======
            <FilterBar
               taskCount={10}
               onChangeSort={this.onChangeSort}
               onChangeFilter={this.onChangeFilter}
            />
>>>>>>> cf45a74c092498b617f5fb22d3de1dea1a38b833
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
