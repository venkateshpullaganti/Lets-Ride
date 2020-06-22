import React from 'react'
import { render } from '@testing-library/react'

import NoDataView from '.'

describe('No data view Tests', () => {
   it('should render the NoData', () => {
      const { getByText } = render(<NoDataView />)
      getByText('No data found!')
   })
})
