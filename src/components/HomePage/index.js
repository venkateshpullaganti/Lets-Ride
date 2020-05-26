import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../logo.svg'

function App() {
   return (
      <div className='App'>
         <header className='App-header'>
            <Link to='/page-1'>Page 1</Link>
            <Link to='/home'>Home</Link>
         </header>
      </div>
   )
}

export default App
