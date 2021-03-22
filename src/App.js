import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'

import AuthRoutes from './Authentication/routes'
import AuthStores from './Authentication/stores'
import { ProtectedRoute } from './Common/components/ProtectedRoute'
import CommuteStores from './Commute/stores'
import CommuteRoutes from './Commute/routes'

import HomePage from './Common/components/HomePage'

import './App.css'

const App = () => {
   return (
      <Provider {...AuthStores} {...CommuteStores}>
         <Router basename={process.env.PUBLIC_URL}>
            <Switch>
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
