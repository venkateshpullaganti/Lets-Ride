import React from 'react'

import ReactPaginate from 'react-paginate'

import { PaginationContainer } from './styledComponents'

function Pagination(props) {
   const { handlePageClick, totoalPages } = props
   return (
      <PaginationContainer>
         <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            pageCount={totoalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
         />
      </PaginationContainer>
   )
}

export { Pagination }
