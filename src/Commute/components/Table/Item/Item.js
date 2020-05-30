import React from 'react'

import { Row, Data, Badge } from './styledComponents'

export function Item(props) {
   const {
      id,
      source,
      destination,
      travelDate,
      flexibleFromDate,
      flexibleToDate,
      isFlexible,
      assetType,
      assetTypeOthers,
      assetSensitivity,
      assetQuantity,
      deliverTo,
      receiverPhoneNumber,
      acceptedPerson,
      acceptedPersonPhoneNumber,
      status
   } = props.row
   return (
      <Row>
         <Data>{source}</Data>
         <Data>{destination}</Data>
         <Data>
            {isFlexible
               ? `${flexibleFromDate} to ${flexibleToDate}`
               : `${travelDate}`}
         </Data>
         <Data>{assetQuantity}</Data>
         <Data>{assetType === '' ? assetTypeOthers : assetType}</Data>
         <Data>{assetSensitivity}</Data>
         <Data>
            {deliverTo}
            {receiverPhoneNumber}
         </Data>
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
            isExpired={status === 'EXPIRED'}
            isAccepted={status === 'ACCEPTED'}
         >
            {status}
         </Badge>
      </Row>
   )
}
