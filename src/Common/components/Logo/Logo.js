import React from 'react'
import images from '../../themes/images'

import { CustomLogo } from './styledComponents'

export function Logo(props) {
   const { height, width, src } = props
   return <CustomLogo alt={'logo'} height={height} width={width} src={src} />
}
Logo.defaultProps = {
   height: '64px',
   width: '64px',
   src: images.mainLogo
}
