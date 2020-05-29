import React from 'react'

import { Row, Data, Badge } from './styledComponents'

export function Item(props) {
   const {
      sourcePlace,
      destinationPlace,
      isFlexible,
      mainDate,
      fromDate,
      toDate,
      seatCount,
      laguageCount,
      acceptedPerson,
      acceptedPersonPhone,
      status
   } = props.request
   return (
      <Row>
         <Data>{sourcePlace}</Data>
         <Data>{destinationPlace}</Data>
         <Data>{isFlexible ? `${fromDate} to ${toDate}` : `${mainDate}`}</Data>
         <Data>{seatCount}</Data>
         <Data>{laguageCount}</Data>
         <Data>
            {acceptedPerson}
            {acceptedPersonPhone}
         </Data>

         <Badge isConfirmed={status.toLowerCase() === 'confirmed'}>
            {status}
         </Badge>
      </Row>
   )
}
