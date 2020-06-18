import React, { Component } from 'react'
import { observable, computed, action } from 'mobx'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import { Pagination } from '../../../Common/components/Pagination'

import { RIDE, ASSET } from '../../constants/CommuteConstants'

import { AddRequestBtn, TotalPages, TableFooter } from '../../styledComponents'
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
import { FilterBar } from '../Common/Components/FilterBar'
import { Selector } from '../Selector'

import {
   RequestsContainer,
   RequestTable,
   RequestsHeader,
   Col
} from './styledComponents'
import { Item } from './Item'

import { TableTabBar } from '../Common/Components/TableTabBar'

@inject('commuteStore')
@observer
class MyRequests extends Component {
   @observable selectedField

   constructor(props) {
      super(props)
      this.init()
   }
   init = () => {
      this.selectedField = RIDE
   }

   get rideRequestPaginationStore() {
      return this.props.commuteStore.rideRequestPaginationStore
   }
   get assetRequestPaginationStore() {
      return this.props.commuteStore.assetRequestPaginationStore
   }

   componentDidMount() {
      this.doMyRideRequestApiCall()
   }

   @action
   showRide = () => {
      this.selectedField = RIDE
      this.doMyRideRequestApiCall()
   }

   @action
   showAsset = () => {
      this.selectedField = ASSET
      this.doMyAssetsRequestApiCall()
   }

   @action
   onChangeRideFilter = selectedFilter => {
      const { onChangeFilter } = this.rideRequestPaginationStore
      onChangeFilter(selectedFilter)
   }
   @action
   onChangeRideSort = selectedSort => {
      const { onChangeSort } = this.rideRequestPaginationStore
      onChangeSort(selectedSort)
   }

   @action
   onChangeAssetFilter = selectedFilter => {
      const { onChangeFilter } = this.assetRequestPaginationStore
      onChangeFilter(selectedFilter)
   }
   @action
   onChangeAssetSort = selectedSort => {
      const { onChangeSort } = this.assetRequestPaginationStore
      onChangeSort(selectedSort)
   }

   navigateToRideRequestForm = () => {
      const { history } = this.props
      history.push(RIDE_REQUEST_PATH)
   }
   navigateToAssetRequestForm = () => {
      const { history } = this.props
      history.push(ASSET_TRANSPORT_REQUEST_PATH)
   }

   doMyAssetsRequestApiCall = () => {
      this.assetRequestPaginationStore.getEntities()
   }

   doMyRideRequestApiCall = () => {
      this.rideRequestPaginationStore.getEntities()
   }

   renderRequests = observer(() => {
      const { currentPageEntities } = this.rideRequestPaginationStore
      return currentPageEntities.map(request => (
         <Item key={request.id} request={request} />
      ))
   })
   renderRequestsHeader = () => {
      return (
         <RequestsHeader key={'Table Header'}>
            {RIDE_TABLE_COLUMNS.map(item => (
               <Col key={item}>{item}</Col>
            ))}
         </RequestsHeader>
      )
   }

   renderRidesTable = () => {
      const {
         apiStatus,
         apiError,
         onChangePage,
         sortOptions,
         filterOptions,
         currentPage,
         totalPages,
         totalEntitiesCount
      } = this.rideRequestPaginationStore
      return (
         <>
            <FilterBar
               taskCount={totalEntitiesCount || 0}
               onChangeSort={this.onChangeRideSort}
               onChangeFilter={this.onChangeRideFilter}
               filterOptions={filterOptions}
               sortOptions={sortOptions}
            />
            <RequestTable>
               {this.renderRequestsHeader()}
               <LoadingWrapperWithFailure
                  apiStatus={apiStatus}
                  onRetryClick={this.doMyRideRequestApiCall}
                  apiError={apiError}
                  renderSuccessUI={this.renderRequests}
               />
            </RequestTable>
            <TableFooter>
               <AddRequestBtn onClick={this.navigateToRideRequestForm}>
                  {strings.addRequest}
               </AddRequestBtn>
               <TotalPages>{`Page ${currentPage} of ${totalPages}`}</TotalPages>
               <Pagination
                  handlePageClick={onChangePage}
                  totalPages={totalPages}
                  currentPage={currentPage}
               />
            </TableFooter>
         </>
      )
   }

   renderAssetsTable = () => {
      const {
         apiStatus,
         apiError,
         onChangePage,
         sortOptions,
         filterOptions,
         currentPage,
         totalPages,
         totalEntitiesCount,
         currentPageEntities
      } = this.assetRequestPaginationStore
      return (
         <Table
            headerItems={ASSET_TABLE_COLUMNS}
            tableData={currentPageEntities}
            onClickAddRequest={this.navigateToAssetRequestForm}
            totalAssetPages={totalPages}
            currentPage={currentPage}
            handleAssetPageClick={onChangePage}
            taskCount={totalEntitiesCount}
            onChangeSort={this.onChangeAssetSort}
            onChangeFilter={this.onChangeAssetFilter}
            filterOptions={filterOptions}
            sortOptions={sortOptions}
            apiStatus={apiStatus}
            apiError={apiError}
            onRetryClick={this.doMyAssetsRequestApiCall}
         />
      )
   }

   renderSelectedTable = () => {
      if (this.selectedField === strings.ride) {
         return this.renderRidesTable()
      }
      return this.renderAssetsTable()
   }

   render() {
      return (
         <RequestsContainer>
            <TableTabBar
               selected={this.selectedField}
               onClickRide={this.showRide}
               onClickAsset={this.showAsset}
            />
            {this.renderSelectedTable()}
         </RequestsContainer>
      )
   }
}

export default withRouter(MyRequests)
