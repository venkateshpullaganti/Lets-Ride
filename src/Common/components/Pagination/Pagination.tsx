import React from 'react'

import ReactPaginate from 'react-paginate'

interface PaginationProps {
   handlePageClick: (page: number) => void
   totalPages: number
   currentPage: number
   pageRange: number
}

class Pagination extends React.Component<PaginationProps> {
   static defaultProps = {
      pageRange: 2,
      totalPages: 1
   }
   handlePageClick = pageObj => {
      const { handlePageClick } = this.props
      handlePageClick(pageObj.selected + 1)
   }

   render() {
      const { totalPages, currentPage, pageRange } = this.props

      return (
         <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={pageRange}
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
