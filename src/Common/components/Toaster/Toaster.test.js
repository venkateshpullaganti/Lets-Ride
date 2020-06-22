import React from 'react'
import { render } from '@testing-library/react'

import { displayToaster } from '.'

describe('Toaster tests', () => {
   it('should render the success toaster', () => {
      const { debug, getByText } = render(
         displayToaster('this is success', false)
      )
      //   getByText('this is success')
   })
})
