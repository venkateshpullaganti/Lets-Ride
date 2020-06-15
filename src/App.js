import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'

import AuthRoutes from './Authentication/routes'
import AuthStores from './Authentication/stores'

import { ProtectedRoute } from './Common/components/ProtectedRoute'

import CommuteStores from './Commute/stores'

import CommuteRoutes from './Commute/routes'

import HomePage from './components/HomePage'
import Page1 from './components/Page1'

import './App.css'

const App = () => {
   return (
      <Provider {...AuthStores} {...CommuteStores}>
         <Router basename={process.env.PUBLIC_URL}>
            <Switch>
               <Route exact path='/page-1'>
                  <Page1 />
               </Route>

               {AuthRoutes}
               {CommuteRoutes}
               <Route path='/'>
                  <HomePage />
               </Route>
            </Switch>
         </Router>
      </Provider>
   )
}

export default App
