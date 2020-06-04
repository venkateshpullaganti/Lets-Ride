import React from 'react'

import { Row, Data, Accepted, AcceptRequest } from './styledComponents'
import Images from '../../../../../Common/themes/Images'
import { observer } from 'mobx-react'

export const EachRow = observer(props => {
   const {
      id,
      sourcePlace,
      destinationPlace,
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
      isAccepted,
      requestedPerson,
      requestedPersonMobile,
      onAcceptRequest
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
               ? `${flexibleFromDate} to  ${flexibleToDate}`
               : `${travelDate}`}
         </Data>
         <Data>{assetQuantity}</Data>
         <Data>{assetType === 'OTHERS' ? assetTypeOthers : assetType}</Data>
         <Data>{assetSensitivity}</Data>
         <Data>
            {deliverTo}
            <br />
            {receiverPhoneNumber}{' '}
         </Data>
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
               <AcceptRequest onClick={onAcceptRequest}>
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
})
