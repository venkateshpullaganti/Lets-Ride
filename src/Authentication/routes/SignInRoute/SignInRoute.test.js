import React from 'react'
import { render, fireEvent, waitFor, getByRole } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'
import { API_SUCCESS } from '@ib/api-constants'

import { AuthService } from '../../../Authentication/services/AuthService'

import { SIGN_IN_PATH } from '../../constants/NavigationConstants'

import { HOMEPAGE_PATH } from '../../../Commute/constants/NavigationConstants'

import { AuthStore } from '../../stores/AuthStore'
import getUserSignInFixture from '../../fixtures/getUserSignInFixture.json'

import { SignInRoute } from '.'

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

describe('SignInRoute Tests', () => {
   let authAPI
   let authStore

   beforeEach(() => {
      authAPI = new AuthService()
      authStore = new AuthStore(authAPI)
   })
   afterEach(() => {
      jest.resetAllMocks()
   })

   it('Should render mobile number empty error message', () => {
      const { getByText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )
      const signInBtn = getByRole('button', { name: 'LOGIN' })
      fireEvent.click(signInBtn)
      getByText(/MobileNumber Required/i)
   })

   it('should render password empty error message', () => {
      const mobileNumber = '123456'
      const { getByText, getByRole, getByLabelText } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )
      const mobileNumberField = getByLabelText('MOBILE NUMBER')
      const signInBtn = getByRole('button', { name: 'LOGIN' })

      fireEvent.change(mobileNumberField, { target: { value: mobileNumber } })
      fireEvent.click(signInBtn)
      getByText(/Password Required/i)
   })

   it('should render loading state', () => {
      const mobileNumber = '12345'
      const password = 'test-password'
      const { getByLabelText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )
      const mobileNumberField = getByLabelText('MOBILE NUMBER')
      const passwordField = getByLabelText('PASSWORD')
      const signInBtn = getByRole('button', { name: 'LOGIN' })

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockSignInApi = jest.fn()
      mockSignInApi.mockReturnValue(mockLoadingPromise)
      authAPI.signInAPI = mockSignInApi

      fireEvent.change(mobileNumberField, { target: { value: mobileNumber } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(signInBtn)

      waitFor(() => getByRole('button', { disabled: true }))
   })
   it('should navigate to home page on  successful login', async () => {
      const history = createMemoryHistory()
      const route = SIGN_IN_PATH
      history.push(route)

      const mobileNumber = '123456'
      const password = 'test-password'

      const { getByTestId, getByLabelText, getByRole } = render(
         <Provider authStore={authStore}>
            <Router history={history}>
               <Route path={SIGN_IN_PATH}>
                  <SignInRoute />
               </Route>
               <Route path={HOMEPAGE_PATH}>
                  <LocationDisplay />
               </Route>
            </Router>
         </Provider>
      )

      const mockSuccessPromise = new Promise((resolve, reject) => {
         resolve(getUserSignInFixture)
      })

      const mockSignInApi = jest.fn()
      mockSignInApi.mockReturnValue(mockSuccessPromise)
      authAPI.signInAPI = mockSignInApi

      const mobileNumberField = getByLabelText('MOBILE NUMBER')
      const passwordField = getByLabelText('PASSWORD')
      const signInBtn = getByRole('button', { name: 'LOGIN' })

      fireEvent.change(mobileNumberField, { target: { value: mobileNumber } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(signInBtn)

      await waitFor(() => {
         expect(authStore.getUserSignInAPIStatus).toBe(API_SUCCESS)
         expect(getByTestId('location-display')).toHaveTextContent(
            HOMEPAGE_PATH
         )
         expect(signInBtn).not.toBeInTheDocument()
      })
   })

   // it('should render network failure state', () => {
   //    const mobileNumber = '123456'
   //    const password = 'test-password'

   //    const mockLoadingPromise = new Promise(function(resolve, reject) {
   //       reject(new Error('error'))
   //    }).catch(() => {})

   //    const mockSignInApi = jest.fn()
   //    mockSignInApi.mockReturnValue(mockLoadingPromise)
   //    authAPI.signInAPI = mockSignInApi

   //    const { getByLabelText, getByRole } = render(
   //       <Router history={createMemoryHistory()}>
   //          <SignInRoute authStore={authStore} />
   //       </Router>
   //    )
   //    const mobileNumberField = getByLabelText('MOBILE NUMBER')
   //    const passwordField = getByLabelText('PASSWORD')
   //    const signInBtn = getByRole('button', { name: 'LOGIN' })

   //    fireEvent.change(mobileNumberField, { target: { value: mobileNumber } })
   //    fireEvent.change(passwordField, { target: { value: password } })
   //    fireEvent.click(signInBtn)

   //    waitFor(() => {
   //       getByText(/NETWORK_ERROR/i)
   //    })
   // })
})
