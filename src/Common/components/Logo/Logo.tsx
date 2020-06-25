import React from 'react'
import images from '../../themes/Images'

import { CustomLogo } from './styledComponents'

interface LogoProps {
   height: string
   width: string
   src: string
   onClick?: () => void
}

export function Logo(props: LogoProps) {
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
