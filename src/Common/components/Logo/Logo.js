import React from 'react'
import images from '../../themes/Images'

import { CustomLogo } from './styledComponents'

export function Logo(props) {
   const { height, width, src, onClick } = props
   return (
      <CustomLogo
         onClick={onClick}
         alt={'logo'}
         height={height}
         width={width}
         src={src}
      />
   )
}
Logo.defaultProps = {
   height: '64px',
   width: '64px',
   src: images.mainLogo
}
