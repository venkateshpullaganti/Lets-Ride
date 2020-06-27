import React from 'react'
import { action } from '@storybook/addon-actions'
import { text, withKnobs } from '@storybook/addon-knobs'

import { sourcePlaceValidation } from '../../utils/ValidationUtils'

import { TextInput } from '.'
export default {
   component: TextInput,
   title: 'Common/TextInput'
}

export const defaultView = () => (
   <TextInput
      type={'text'}
      placeholder={'Enter username'}
      label={'Username'}
      onBlur={action}
      validationFunction={sourcePlaceValidation}
   />
)

export const knob = () => (
   <TextInput
      type={'text'}
      placeholder={text('placeholder', 'Enter username')}
      label={text('Label', 'Username')}
      onBlur={action('onBlur')}
      validationFunction={sourcePlaceValidation}
   />
)
knob.story = {
   decorators: [withKnobs]
}
