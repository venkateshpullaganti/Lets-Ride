import React, { Component } from 'react'
import ReactLoading from 'react-loading'

const options = {
   width: 50,
   height: 50
}

class Loader extends Component {
   render() {
      return (
         <div>
            <ReactLoading
               data-testid='react-loader'
               type='spin'
               options={options}
               color={'#0b69ff'}
               {...this.props}
            />
         </div>
      )
   }
}

export default Loader
