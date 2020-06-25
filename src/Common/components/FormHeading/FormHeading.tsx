import React from 'react'

import { Heading } from './styledComponents'

interface FormHeadingProps {
   headingText: string
}

export function FormHeading(props: FormHeadingProps) {
   const { headingText } = props
   return <Heading>{headingText}</Heading>
}
