import React from 'react'

import { Row, Data } from './styledComponents'

import { Badge } from '../../../styledComponents'

export function Item(props) {
   const {
      id,
      sourcePlace,
      destinationPlace,
      isFlexible,
      travelDate,
      flexibleFromDate,
      flexibleToDate,
      seatCount,
      laguageCount,
      acceptedPerson,
      acceptedPersonPhoneNumber,
      status
   } = props.request
   return (
      <Row key={id}>
         <Data>{sourcePlace}</Data>
         <Data>{destinationPlace}</Data>
         <Data>
            {isFlexible
               ? `${flexibleFromDate} to ${flexibleToDate}`
               : `${travelDate}`}
         </Data>
         <Data>{seatCount}</Data>
         <Data>{laguageCount}</Data>
         <Data>
            {status === 'ACCEPTED' ? (
               <>
                  <span className='block'>{acceptedPerson}</span>
                  {acceptedPersonPhoneNumber}
               </>
            ) : (
               '--'
            )}
         </Data>

         <Badge
            isAccepted={status === 'ACCEPTED'}
            isExpired={status === 'EXPIRED'}
         >
            {status}
         </Badge>
      </Row>
   )
}
