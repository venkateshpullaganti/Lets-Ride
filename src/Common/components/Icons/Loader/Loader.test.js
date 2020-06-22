import React from 'react'
import { render } from '@testing-library/react'

import Loader from '.'

describe('Loader tests', () => {
   it('should render the loader', () => {
      const { getByTestId } = render(<Loader />)
      getByTestId('react-loader')
   })
})
