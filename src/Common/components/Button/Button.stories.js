import React from 'react'

import { Button } from '.'

export default {
   component: Button,
   title: 'Common/Button'
}

export const defaultView = () => (
   <Button isLoading={false} displayText={'SignUp'} type={'button'} />
)
export const loadingView = () => (
   <Button isLoading={true} displayText={'SignUp'} type={'button'} />
)
