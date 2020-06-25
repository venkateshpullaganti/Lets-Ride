import React from 'react'

import { Input } from '.'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'

export default {
   component: Input,
   title: 'Common/Input'
}

export const TextInput = () => (
   <Input
      type={'text'}
      id={'text-input'}
      labelText={'From'}
      onChange={() => {}}
      value={''}
   />
)

export const passwordInput = () => (
   <Input
      type={'password'}
      id={'pwd-input'}
      labelText={'Enter password'}
      onChange={() => {}}
      value={''}
   />
)
export const knob = () => (
   <Input
      type={'text'}
      id={'text'}
      labelText={'enter text'}
      isError={boolean('Is Error', true)}
      errorMsg={text('Error Message', 'Incorrect Input')}
      onChange={() => {}}
      value={''}
   />
)
knob.story = {
   decorators: [withKnobs]
}
