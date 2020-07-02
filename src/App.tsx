import React, { Suspense } from 'react'
import { I18nextProvider } from 'react-i18next'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'

import AuthRoutes from './Authentication/routes'
import AuthStores from './Authentication/stores'

import LoadingView from './Common/components/LoadingWrapperWithFailure/LoadingView'
import CommuteStores from './Commute/stores'
import CommuteRoutes from './Commute/routes'

import HomePage from './components/HomePage'
import Page1 from './components/Page1'

import './App.css'
import i18n from './Common/i18n'

const App = () => {
   return (
      <Provider {...AuthStores} {...CommuteStores}>
         <I18nextProvider i18n={i18n}>
            <Suspense fallback={<LoadingView />}>
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
            </Suspense>
         </I18nextProvider>
      </Provider>
   )
}

export default App
