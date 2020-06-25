import React, { Component } from 'react'
import ReactLoading from 'react-loading'

interface LoaderProps {
   color: string
   width: number
   hight: number
}

class Loader extends Component {
   static defaultProps = { width: 50, height: 50 }
   render() {
      return (
         <ReactLoading
            type='spin'
            width={50}
            height={50}
            color={'#0b69ff'}
            {...this.props}
         />
      )
   }
}

export default Loader
