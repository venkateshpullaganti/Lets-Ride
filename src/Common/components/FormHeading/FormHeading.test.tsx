import React from 'react'
import { render } from '@testing-library/react'

import { FormHeading } from '.'

describe('Form Heading tests', () => {
   it('should render the given heading', () => {
      const headingText = 'iB Hubs'
      const { getByText } = render(<FormHeading headingText={headingText} />)
      getByText(headingText)
   })
})
