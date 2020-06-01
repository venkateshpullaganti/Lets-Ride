import React from 'react'

import Loader from 'react-loader-spinner'

// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css

import ReactPaginate from 'react-paginate'

class Page1 extends React.Component {
   handlePageClick = event => {
      console.log(event.selected)
   }

   render() {
      return (
         <>
            <Loader type='Puff' color='#00BFFF' height={100} width={100} />
            <Loader type='Circles' color='#00BFFF' height={80} width={80} />
            <Loader type='Rings' color='#00BFFF' height={80} width={80} />
            <Loader type='TailSpin' color='#00BFFF' height={80} width={80} />
            <ReactPaginate
               previousLabel={'<'}
               nextLabel={'>'}
               breakLabel={'...'}
               pageCount={10}
               marginPagesDisplayed={2}
               pageRangeDisplayed={1}
               onPageChange={this.handlePageClick}
               containerClassName={'pagination'}
            />
         </>
      )
   }
}

export default Page1
