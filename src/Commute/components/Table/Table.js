import React, { Component } from 'react'

import { Selector } from '../Selector'
import { Pagination } from '../../../Common/components/Pagination'

import strings from '../../i18n/strings.json'
import { AddRequestBtn, TotalPages, TableFooter } from '../../styledComponents'

import { Item } from './Item'

import { TableContainer, Header, Col } from './styledComponents'

class Table extends Component {
   renderHeader = () => {
      const { headerItems, filterByStatus, statusFilterOptions } = this.props

      return (
         <Header key={'Table Header'}>
            {headerItems.map(item => (
               <Col key={item}>{item}</Col>
            ))}
            <Selector
               dropdownName={strings.status}
               options={['Active', 'Expired']}
               onChange={filterByStatus}
            />
         </Header>
      )
   }
   renderRows = () => {
      const { tableData } = this.props
      return tableData.map(eachRow => (
         <Item key={Math.random()} row={eachRow} />
      ))
   }

   render() {
      const {
         onClickAddRequest,
         totalAssetPages,
         currentAssetPage,
         handleAssetPageClick
      } = this.props
      return (
         <div>
            <TableContainer>
               {this.renderHeader()}
               {this.renderRows()}
            </TableContainer>
            <TableFooter>
               <AddRequestBtn onClick={onClickAddRequest}>
                  {strings.addRequest}
               </AddRequestBtn>
               <TotalPages>{`PAGE ${currentAssetPage} OF ${totalAssetPages}`}</TotalPages>
               <Pagination
                  handlePageClick={handleAssetPageClick}
                  totoalPages={totalAssetPages}
               />
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
   ]
}
