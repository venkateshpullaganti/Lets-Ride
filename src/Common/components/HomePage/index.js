import React from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { goToHomePage } from '../../../Commute/utils/NavigationUtils/NavigationUtils'

function HomePage({ history }) {
   goToHomePage(history)
   return <div />
}

export default withRouter(HomePage)
