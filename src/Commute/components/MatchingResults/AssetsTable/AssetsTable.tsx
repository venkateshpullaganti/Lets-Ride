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
import { AssetMatchingResultsModel } from '../../../stores/models/AssetMatchingResultsModel'
import { OptionsType, OptionType } from '../../types'

interface AssetsTableProps {
   headerItems: Array<string>
   tableData: Array<AssetMatchingResultsModel>
   onClickAddRequest: () => void
   totalPages: number
   currentPage: number
   handleAssetPageClick: (page: number) => void
   taskCount: number
   onChangeSort: (selectedSort: OptionType) => void
   onChangeFilter: (selectedFilter: OptionType) => void
   filterOptions: OptionsType
   sortOptions: OptionsType
   renderTable: () => void
}

@observer
class AssetsTable extends Component<AssetsTableProps> {
   renderHeader = () => {
      const { headerItems } = this.props

      return (
         <Header key={'AssetsTable Header'}>
            {headerItems.map(item => (
               <Col key={item}>{item}</Col>
            ))}
         </Header>
      )
   }
   renderRows = () => {
      const { tableData, renderTable } = this.props
      return tableData.map(eachRow => (
         <EachRow key={Math.random()} row={eachRow} renderTable={renderTable} />
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