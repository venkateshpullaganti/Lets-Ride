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

const PAGINATION_LIMIT = 16

@inject('commuteStore')
@observer
class MyRequests extends Component {
   @observable selectedField

   assetCurrentPage
   assetPaginationOffset

   rideCurrentPage
   ridePaginationOffset

   constructor(props) {
      super(props)
      this.init()
      this.onSuccess = this.onSuccess.bind(this)
      this.onFailure = this.onFailure.bind(this)
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
   }

   @action
   showRide = () => {
      this.selectedField = strings.ride
   }

   @action
   showAsset = () => {
      this.selectedField = strings.asset
   }

   onChangeFilter = selected => {
      console.log(selected)
   }
   onChangeSort = v => {
      console.log(v)
   }

   navigateToRideRequestForm = () => {
      const { history } = this.props
      history.push(RIDE_REQUEST_PATH)
   }
   navigateToAssetRequestForm = () => {
      const { history } = this.props
      history.push(ASSET_TRANSPORT_REQUEST_PATH)
   }

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

   doMyAssetsRequestApiCall = () => {
      const responseObj = {}

      const paginationObj = {
         PAGINATION_LIMIT,
         offset: this.assetPaginationOffset
      }
      this.commuteStore.myAssetsRequests(
         responseObj,
         this.onSuccessAssetApiCall,
         this.onFailureAssetApiCall,
         paginationObj
      )
   }

   doMyRideRequestApiCall = () => {
      const responseObj = {}

      const paginationObj = {
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
            <RequestTable>
               {this.renderRequestsHeader()}
               {this.renderRequests()}
            </RequestTable>
            <TableFooter>
               <AddRequestBtn onClick={this.navigateToRideRequestForm}>
                  {strings.addRequest}
               </AddRequestBtn>
               <TotalPages>{`PAGE 1 of 1`}</TotalPages>
               <Pagination
                  handlePageClick={this.handleRidePageClick}
                  totoalPages={this.totalRidePages}
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
            currentAssetPage={this.assetCurrentPage}
            handleAssetPageClick={this.handleAssetPageClick}
         />
      )
   }

   renderSelectedTable = () => {
      if (this.selectedField === strings.ride) {
         return (
            <LoadingWrapperWithFailure
               apiStatus={this.commuteStore.getMyRequestsAPIStatus}
               onRetryClick={this.doNetworkCalls}
               apiError={this.commuteStore.getMyRequestsAPIError}
               renderSuccessUI={this.renderRidesTable}
            />
         )
      }
      return (
         <LoadingWrapperWithFailure
            apiStatus={this.commuteStore.getMyRequestsAPIStatus}
            onRetryClick={this.doNetworkCalls}
            apiError={this.commuteStore.getMyRequestsAPIError}
            renderSuccessUI={this.renderAssetsTable}
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
            <FilterBar
               taskCount={10}
               onChangeSort={this.onChangeSort}
               onChangeFilter={this.onChangeFilter}
            />
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
