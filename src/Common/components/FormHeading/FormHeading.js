import React from 'react'

import { Heading } from './styledComponents'

export function FormHeading(props) {
   const { headingText } = props
   return <Heading>{headingText}</Heading>
}
