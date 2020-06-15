import React from 'react'
import { Link } from 'react-router-dom'

function App() {
   return (
      <div className='App'>
         <header className='App-header'>
            <Link to='/page-1'>Page 1</Link>
            <Link to='/home/matching-results'>Home</Link>
            <Link to='/request-ride'>Ride Request</Link>
         </header>
      </div>
   )
}

export default App
