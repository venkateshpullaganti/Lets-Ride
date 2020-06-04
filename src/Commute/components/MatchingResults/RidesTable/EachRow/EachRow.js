import React from 'react'

import { Row, Data, Accepted, AcceptRequest } from './styledComponents'
import Images from '../../../../../Common/themes/Images'

export function EachRow(props) {
   const {
      id,
      sourcePlace,
      destinationPlace,
      travelDate,
      flexibleFromDate,
      flexibleToDate,
      isFlexible,
      seatCount,
      laguageCount,
      requestedPerson,
      requestedPersonMobile,
      isAccepted
   } = props.row

   return (
      <Row key={id}>
         <Data>
            {requestedPerson}
            <br />
            {requestedPersonMobile}
         </Data>
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
            {isAccepted ? (
               <Accepted>
                  <img
                     alt='completed'
                     src={Images.correctIcon}
                     width='12px'
                     height='10px'
                  />
               </Accepted>
            ) : (
               <AcceptRequest>
                  <img
                     alt='add'
                     src={Images.addIcon}
                     width='12px'
                     height='10px'
                  />
               </AcceptRequest>
            )}
         </Data>
      </Row>
   )
}
