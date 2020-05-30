import React, { Component } from 'react'
import { observable, computed } from 'mobx'
import { observer, inject } from 'mobx-react'

import { Heading } from '../../styledComponents'
import strings from '../../i18n/strings.json'

import { Table } from '../Table'
import { FilterBar } from '../FilterBar'
import { Selector } from '../Selector'
import { Pagination } from '../Pagination'

import {
   RIDE_TABLE_COLUMNS,
   ASSET_TABLE_COLUMNS
} from '../../constants/MyRequestsConstants'

import {
   RequestsContainer,
   Navigator,
   NavBtn,
   RequestTable,
   RequestsHeader,
   Col,
   TableFooter,
   AddRequest,
   TotalPages
} from './styledComponents'

import { Item } from './Item'

@inject('commuteStore')
@observer
class MyRequests extends Component {
   @observable selectedField

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

   @computed
   get isSelectedRide() {
      return this.selectedField === strings.ride
   }
   @computed
   get isSelectedAsset() {
      return this.selectedField === strings.asset
   }

   showRide = () => {
      this.selectedField = strings.ride
   }
   showAsset = () => {
      this.selectedField = strings.asset
   }
   onChangeFilter = selected => {
      console.log(selected)
   }
   onChangeSort = v => {
      console.log(v)
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
   renderSelectedTable = () => {
      if (this.isSelectedRide) {
         return (
            <>
               <RequestTable>
                  {this.renderRequestsHeader()}
                  {this.renderRequests()}
               </RequestTable>
               <TableFooter>
                  <AddRequest>
                     <span>{'+'}</span>
                     {' ADD Request'}
                  </AddRequest>
                  <TotalPages>{`PAGE 1 of 1`}</TotalPages>
                  <Pagination></Pagination>
               </TableFooter>
            </>
         )
      }
      return (
         <Table
            headerItems={ASSET_TABLE_COLUMNS}
            tableData={this.commuteStore.assetRequests}
         />
      )
   }

   render() {
      return (
         <RequestsContainer>
            <Heading>{strings.myRequests}</Heading>
            <Navigator>
               <NavBtn isSelected={this.isSelectedRide} onClick={this.showRide}>
                  {strings.ride}
               </NavBtn>
               <NavBtn
                  isSelected={this.isSelectedAsset}
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

export { MyRequests }

MyRequests.defaultProps = {
   requests: [
      {
         sourcePlace: 'sourcePlace',
         destinationPlace: 'destinationPlace',
         isFlexible: false,
         mainDate: 'mainDate',
         fromDate: 'fromDate',
         toDate: 'toDate',
         seatCount: 'toDate',
         laguageCount: 'toDate',
         acceptedPerson: 'accept per',
         acceptedPersonPhone: '123456',
         status: 'pending'
      },
      {
         sourcePlace: 'sourcePlace',
         destinationPlace: 'destinationPlace',
         isFlexible: true,
         mainDate: 'mainDate',
         fromDate: 'fromDate',
         toDate: 'toDate',
         seatCount: '4',
         laguageCount: '9',
         acceptedPerson: 'accept per',
         acceptedPersonPhone: '123456',
         status: 'pending'
      },
      {
         sourcePlace: 'sourcePlace',
         destinationPlace: 'destinationPlace',
         isFlexible: false,
         mainDate: 'mainDate',
         fromDate: 'fromDate',
         toDate: 'toDate',
         seatCount: '4',
         laguageCount: '8',
         acceptedPerson: 'accept per',
         acceptedPersonPhone: '123456',
         status: 'pending'
      },
      {
         sourcePlace: 'sourcePlace',
         destinationPlace: 'destinationPlace',
         isFlexible: true,
         mainDate: 'mainDate',
         fromDate: 'fromDate',
         toDate: 'toDate',
         seatCount: '1',
         laguageCount: '0',
         acceptedPerson: 'accept per',
         acceptedPersonPhone: '123456',
         status: 'pending'
      },
      {
         sourcePlace: 'sourcePlace',
         destinationPlace: 'destinationPlace',
         isFlexible: false,
         mainDate: 'mainDate',
         fromDate: 'fromDate',
         toDate: 'toDate',
         seatCount: '6',
         laguageCount: '3',
         acceptedPerson: 'accept per',
         acceptedPersonPhone: '123456',
         status: 'pending'
      },
      {
         sourcePlace: 'sourcePlace',
         destinationPlace: 'destinationPlace',
         isFlexible: true,
         mainDate: 'mainDate',
         fromDate: 'fromDate',
         toDate: 'toDate',
         seatCount: '5',
         laguageCount: '6  ',
         acceptedPerson: 'accept per',
         acceptedPersonPhone: '123456',
         status: 'Confirmed'
      }
   ]
}
