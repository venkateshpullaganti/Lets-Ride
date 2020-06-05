import React, { Component } from 'react'

import { Pagination } from '../../../../Common/components/Pagination'

import strings from '../../../i18n/strings.json'
import {
   AddRequestBtn,
   TotalPages,
   TableFooter
} from '../../../styledComponents'

import { Selector } from '../../Selector'
import { FilterBar } from '../../Common/Components/FilterBar'

import { EachRow } from './EachRow'
import { TableContainer, Header, Col } from './styledComponents'
import { observer } from 'mobx-react'

@observer
class AssetsTable extends Component {
   renderHeader = () => {
      const { headerItems, filterByStatus } = this.props

      return (
         <Header key={'AssetsTable Header'}>
            {headerItems.map(item => (
               <Col key={item}>{item}</Col>
            ))}
         </Header>
      )
   }
   renderRows = () => {
      const { tableData } = this.props
      return tableData.map(eachRow => (
         <EachRow key={Math.random()} row={eachRow} />
      ))
   }

   render() {
      const {
         onClickAddRequest,
         handleAssetPageClick,
         currentPage,
         taskCount,
         onChangeSort,
         onChangeFilter,
         filterOptions,
         sortOptions,
         totalPages
      } = this.props
      return (
         <>
            <FilterBar
               taskCount={taskCount ?? 0}
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
               <TotalPages>{`PAGE ${currentPage} OF ${totalPages}`}</TotalPages>
               <Pagination
                  handlePageClick={handleAssetPageClick}
                  totalPages={totalPages}
                  currentPage={currentPage}
               />
            </TableFooter>
         </>
      )
   }
}

export { AssetsTable }
