import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { Pagination } from '../../../Common/components/Pagination'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'

import strings from '../../i18n/strings.json'
import { AddRequestBtn, TotalPages, TableFooter } from '../../styledComponents'

import { FilterBar } from '../Common/Components/FilterBar'

import { Item } from './Item'
import { TableContainer, Header, Col } from './styledComponents'

@observer
class Table extends Component {
   renderHeader = () => {
      const { headerItems } = this.props

      return (
         <Header key={'Table Header'}>
            {headerItems.map(item => (
               <Col key={item}>{item}</Col>
            ))}
         </Header>
      )
   }
   renderRows = observer(() => {
      const { tableData } = this.props
      return tableData.map(eachRow => (
         <Item key={Math.random()} row={eachRow} />
      ))
   })

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
         sortOptions,
         apiStatus,
         apiError,
         onRetryClick
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
               <LoadingWrapperWithFailure
                  apiStatus={apiStatus}
                  onRetryClick={onRetryClick}
                  apiError={apiError}
                  renderSuccessUI={this.renderRows}
               />
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
