import React from 'react'
import { Button } from '.'
import { render } from '@testing-library/react'

describe('Button Tests', () => {
   it('should test the rendered button text', () => {
      const displayText = 'LOGIN'
      const { getByRole } = render(
         <Button displayText={displayText} isLoading={false} />
      )
      getByRole('button', { name: displayText })
   })
   it('should test the loading state of the button', () => {
      const displayText = 'LOGIN'
      const { getByAltText, getByRole } = render(
         <Button displayText={displayText} isLoading={true} type='button' />
      )
      const button = getByRole('button')

      expect(button).toBeDisabled()
      //   getByAltText('loader')
   })
})
