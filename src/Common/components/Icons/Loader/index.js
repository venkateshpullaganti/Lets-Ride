import React, { Component } from 'react'
import ReactLoading from 'react-loading'

const options = {
   width: 50,
   height: 50
}

class Loader extends Component {
   render() {
      return (
         <ReactLoading
            type='spin'
            options={options}
            alt='loader'
            color={'#0b69ff'}
            {...this.props}
         />
      )
   }
}

export default Loader
