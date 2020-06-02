import React from 'react'
import { text, withKnobs } from '@storybook/addon-knobs'

import strings from '../../i18n/strings.json'

import { Logo } from '.'

export default {
   component: Logo,
   title: 'Common/Logo'
}
export const defaultView = () => <Logo />

export const knob = () => (
   <Logo
      height={text('height', '64px')}
      width={text('width', '64px')}
      src={text('source url', strings.logo)}
   />
)
knob.story = {
   decorators: [withKnobs]
}
