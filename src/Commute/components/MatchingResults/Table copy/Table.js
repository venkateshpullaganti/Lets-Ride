import React, { Component } from 'react'

import { Pagination } from '../../../Common/components/Pagination'

import strings from '../../i18n/strings.json'
import { AddRequestBtn, TotalPages, TableFooter } from '../../styledComponents'

import { Selector } from '../Selector'
import { FilterBar } from '../FilterBar'

import { Item } from './Item'
import { TableContainer, Header, Col } from './styledComponents'

class Table extends Component {
   renderHeader = () => {
      const { headerItems, filterByStatus } = this.props

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
         handleAssetPageClick,
         currentPage,
         taskCount,
         onChangeSort,
         onChangeFilter,
         filterOptions,
         sortOptions
      } = this.props

      return (
         <>
            <FilterBar
               taskCount={taskCount ?? 10}
               onChangeSort={onChangeSort}
               onChangeFilter={onChangeFilter}
               filterOptions={filterOptions}
               sortOptions={sortOptions}
            />
            <TableContainer>
               {this.renderHeader()}
               {this.renderRows()}
            </TableContainer>
            <TableFooter>
               <AddRequestBtn onClick={onClickAddRequest}>
                  {strings.addRequest}
               </AddRequestBtn>
               <TotalPages>{`PAGE ${currentPage} OF ${totalAssetPages}`}</TotalPages>
               <Pagination
                  handlePageClick={handleAssetPageClick}
                  totalPages={totalAssetPages}
                  currentPage={currentPage}
               />
            </TableFooter>
         </>
      )
   }
}

export { Table }
