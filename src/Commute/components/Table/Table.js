import React, { Component } from 'react'

import { Selector } from '../Selector'

import { Pagination } from '../Pagination'

import { Item } from './Item'

import {
   TableContainer,
   Header,
   Col,
   TableFooter,
   AddRequest,
   TotalPages
} from './styledComponents'

class Table extends Component {
   renderHeader = () => {
      const { headerItems, filterByStatus } = this.props

      return (
         <Header key={'Table Header'}>
            {headerItems.map(item => (
               <Col key={item}>{item}</Col>
            ))}
            <Selector
               dropdownName={'STATUS'}
               options={['Active', 'Expired']}
               onChange={filterByStatus}
            />
         </Header>
      )
   }
   renderRows = () => {
      const { tableData } = this.props
      return tableData.map(eachRow => <Item row={eachRow} />)
   }

   render() {
      const { dropdownName } = this.props
      return (
         <div>
            <TableContainer>
               {this.renderHeader()}
               {this.renderRows()}
            </TableContainer>
            <TableFooter>
               <AddRequest>
                  <span>{'+'}</span>
                  {' ADD Request'}
               </AddRequest>
               <TotalPages>{`PAGE 1 of 1`}</TotalPages>
               <Pagination></Pagination>
            </TableFooter>
         </div>
      )
   }
}

export { Table }

Table.defaultProps = {
   headerItems: [
      'FROM',
      'TO',
      'DATE AND TIME',
      'NO.OF PEOPLE',
      'LAGUAGE QUANTITY',
      'ACCEPTED PERSON DETAILS'
   ],
   tableData: [
      [
         'sourcePlace',
         'destinationPlace',
         false,
         'mainDate',
         'fromDate',
         'toDate',
         'toDate',
         'toDate',
         'accept per',
         '123456',
         'pending'
      ],
      [
         'sourcePlace',
         'destinationPlace',
         true,
         'mainDate',
         'fromDate',
         'toDate',
         '4',
         '9',
         'accept per',
         '123456',
         'pending'
      ],
      [
         'sourcePlace',
         'destinationPlace',
         true,
         'mainDate',
         'fromDate',
         'toDate',
         '4',
         '9',
         'accept per',
         '123456',
         'pending'
      ],
      [
         'sourcePlace',
         'destinationPlace',
         true,
         'mainDate',
         'fromDate',
         'toDate',
         '4',
         '9',
         'accept per',
         '123456',
         'pending'
      ],
      [
         'sourcePlace',
         'destinationPlace',
         true,
         'mainDate',
         'fromDate',
         'toDate',
         '4',
         '9',
         'accept per',
         '123456',
         'pending'
      ],
      [
         'sourcePlace',
         'destinationPlace',
         true,
         'mainDate',
         'fromDate',
         'toDate',
         '4',
         '9',
         'accept per',
         '123456',
         'pending'
      ]
   ]
}
