import React from 'react'
import { createMemoryHistory } from 'history'

import { navigateToGivenPath } from './NavigationUtils'

describe('Navigation Utils Tests', () => {
   it(' navigateToGivenPath()', () => {
      const history = createMemoryHistory()
      const expectedOutput = '/home/ride-request'
      navigateToGivenPath(expectedOutput, history)
      expect(history.location.pathname).toBe(expectedOutput)
   })
})
