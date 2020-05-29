import React, { Component } from 'react'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import { HomePageHeader } from '../../styledComponents'
import strings from '../../i18n/strings.json'
import { FilterBar } from '../FilterBar'
import { Selector } from '../Selector'
import { Pagination } from '../Pagination'

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

@observer
class MyRequests extends Component {
   @observable selectedField

   constructor(props) {
      super(props)
      this.init()
   }
   init = () => {
      this.selectedField = strings.ride
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
      const { requests } = this.props
      return requests.map(request => (
         <Item key={Math.random()} request={request} />
      ))
   }
   renderRequestsHeader = () => {
      const columns = [
         'FROM',
         'TO',
         'DATE AND TIME',
         'NO.OF PEOPLE',
         'LAGUAGE QUANTITY',
         'ACCEPTED PERSON DETAILS'
      ]
      const { filterByStatus } = this.props
      return (
         <RequestsHeader key={'Table Header'}>
            {columns.map(item => (
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

   render() {
      return (
         <RequestsContainer>
            <HomePageHeader>{strings.myRequests}</HomePageHeader>
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
            <RequestTable>
               {this.renderRequestsHeader()}
               {this.renderRequests()}
            </RequestTable>
            <TableFooter>
               <AddRequest>
                  <span>{'+'}</span>
                  {' ADD Request'}
               </AddRequest>
               <TotalPages>{`PAGE 1 of 30`}</TotalPages>
               <Pagination></Pagination>
            </TableFooter>
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
