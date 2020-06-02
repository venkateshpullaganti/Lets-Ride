import React from 'react'

import Loader from 'react-loader-spinner'

import Select from 'react-select'

// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css

import ReactPaginate from 'react-paginate'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

const options = [
   { value: 'chocolate_cadbury', label: 'Chocolate Cadbury' },
   { value: 'strawberry', label: 'Strawberry' },
   { value: 'vanilla', label: 'Vanilla' }
]

@observer
class Page1 extends React.Component {
   @observable page
   @observable pageCount = 10

   handlePageClick = event => {
      this.page = event.selected + 1
   }
   handleChange = val => {
      console.log(val.value)
   }

   render() {
      console.log('render', this.page)
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
               pageCount={this.pageCount}
               marginPagesDisplayed={2}
               pageRangeDisplayed={1}
               onPageChange={this.handlePageClick}
               containerClassName={'pagination'}
            />

            <div>
               <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={this.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={'pagination'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'}
               />
               <label htmlFor='assetType'>Filter</label>
               <Select
                  id='assetType'
                  value=''
                  className='bg-green-500 w-64 focus:outline-none rounded '
                  onChange={this.handleChange}
                  options={options}
                  placeholder='Filter'
               />
               <select id='fsdfs0'>
                  <option selected hidden>
                     default
                  </option>
                  <option>KJFskdf</option>
                  <option>KJFskdf</option>
               </select>
            </div>
         </>
      )
   }
}

export default Page1
