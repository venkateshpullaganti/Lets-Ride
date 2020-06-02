import React from 'react'

import ReactPaginate from 'react-paginate'

<<<<<<< HEAD
class Pagination extends React.Component {
   handlePageClick = event => {
      const { handlePageClick, totalPages } = this.props
      handlePageClick(event.selected + 1)
   }

   render() {
      const { totalPages, currentPage } = this.props
      return (
=======
import { PaginationContainer } from './styledComponents'

function Pagination(props) {
   const { handlePageClick, totoalPages } = props
   return (
      <PaginationContainer>
>>>>>>> cf45a74c092498b617f5fb22d3de1dea1a38b833
         <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
<<<<<<< HEAD
            breakClassName={'break-me'}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            disableInitialCallback={true}
            forcePage={currentPage - 1}
         />
      )
   }
}

export { Pagination }

// ;<ReactPaginate
//    previousLabel={'<'}
//    nextLabel={'>'}
//    breakLabel={'...'}
//    breakClassName={'break-me'}
//    pageCount={totalPages}
//    marginPagesDisplayed={2}
//    pageRangeDisplayed={2}
//    onPageChange={handlePageClick}
//    containerClassName={'pagination'}
//    subContainerClassName={'pages pagination'}
//    active='border-1 border-solid border-green-500'
//    // activeClassName={'active'}
// />
=======
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
>>>>>>> cf45a74c092498b617f5fb22d3de1dea1a38b833
