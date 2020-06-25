import React from 'react'
import { API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'
import { render, fireEvent } from '@testing-library/react'

import LoadingWrapperWithFailure from '.'

const successUi = () => <div>{'SuccessUi'}</div>

describe('LoadingWrapperWithFailure tests', () => {
   beforeEach(() => {
      jest.resetAllMocks()
   })

   it('should render the loading state', () => {
      const { getByLabelText } = render(
         <LoadingWrapperWithFailure
            apiStatus={API_FETCHING}
            onRetryClick={jest.fn}
            renderSuccessUI={successUi}
            apiError={null}
         />
      )
      getByLabelText('audio-loading')
   })

   it('should render the noData view', () => {
      const { getByText } = render(
         <LoadingWrapperWithFailure
            isNoData={true}
            apiStatus={API_SUCCESS}
            onRetryClick={jest.fn}
            renderSuccessUI={successUi}
            apiError={null}
         />
      )
      getByText('No data found!')
   })

   it('should render the success ui', () => {
      const { getByText } = render(
         <LoadingWrapperWithFailure
            apiStatus={API_SUCCESS}
            renderSuccessUI={successUi}
            onRetryClick={jest.fn}
            apiError={null}
         />
      )
      getByText('SuccessUi')
   })

   it('should render the error state', () => {
      const mockRetryClick = jest.fn()
      const { getByText, getByRole } = render(
         <LoadingWrapperWithFailure
            apiStatus={API_FAILED}
            apiError={new Error()}
            onRetryClick={mockRetryClick}
            renderSuccessUI={successUi}
         />
      )
      const retryBtn = getByRole('button')
      getByText(
         `We're having some trouble completing your request. Please try again.`
      )

      fireEvent.click(retryBtn)
      expect(mockRetryClick).toBeCalled()
   })
})
