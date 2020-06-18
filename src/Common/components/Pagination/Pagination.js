import React from 'react'

import ReactPaginate from 'react-paginate'

class Pagination extends React.Component {
   handlePageClick = event => {
      const { handlePageClick } = this.props
      handlePageClick(event.selected + 1)
   }

   render() {
      const { totalPages, currentPage, pageRange } = this.props

      return (
         <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={totalPages || 1}
            marginPagesDisplayed={2}
            pageRangeDisplayed={pageRange || 2}
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
