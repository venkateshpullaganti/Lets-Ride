import React from 'react'

import { BaseButton } from '.'

import { Typo32DarkBlueGreyRubikRegular } from '../../../../styleGuide/Typos'

export default {
   component: BaseButton,
   title: 'Common/Common Button'
}

export const defaultView = () => <BaseButton text='Hello' />
export const disabledButton = () => (
   <BaseButton
      text='disabled Button'
      isDisabled={true}
      typo={Typo32DarkBlueGreyRubikRegular}
   />
)
