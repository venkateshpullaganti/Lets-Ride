import React from 'react'
import { observer } from 'mobx-react'
import { API_SUCCESS, API_FAILED } from '@ib/api-constants'
import { reaction } from 'mobx'

import Images from '../../../../../Common/themes/Images'
import { displayToaster } from '../../../../../Common/components/Toaster'

import { Row, Data, Accepted, AcceptRequest } from './styledComponents'

@observer
class EachRow extends React.Component {
   onClickAddBtn = () => {
      const { acceptRequest } = this.props.row
      acceptRequest()
   }
   successReaction = reaction(
      () => {
         return this.props.row.assetRequestApiStatus === API_SUCCESS
      },
      boole => {
         displayToaster('Asset Request Accepted Successfully.', false)
         setTimeout(() => {
            this.props.renderTable()
         }, 500)
      }
   )
   failureReaction = reaction(
      () => {
         return this.props.row.assetRequestApiError
      },
      error => {
         displayToaster('Something went werong.', true, error)
      }
   )
   componentWillUnmount() {
      this.successReaction()
      this.failureReaction()
   }

   render() {
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
         requestedPersonMobile
      } = this.props.row
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
                  <AcceptRequest onClick={this.onClickAddBtn}>
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
}

// export const EachRow = observer(props => {
//    const {
//       id,
//       sourcePlace,
//       destinationPlace,
//       travelDate,
//       flexibleFromDate,
//       flexibleToDate,
//       isFlexible,
//       assetType,
//       assetTypeOthers,
//       assetSensitivity,
//       assetQuantity,
//       deliverTo,
//       receiverPhoneNumber,
//       isAccepted,
//       requestedPerson,
//       requestedPersonMobile,
//       onAcceptRequest
//    } = props.row
//    return (
//       <Row key={id}>
//          <Data>
//             {requestedPerson}
//             <br />
//             {requestedPersonMobile}
//          </Data>
//          <Data>{sourcePlace}</Data>
//          <Data>{destinationPlace}</Data>
//          <Data>
//             {isFlexible
//                ? `${flexibleFromDate} to  ${flexibleToDate}`
//                : `${travelDate}`}
//          </Data>
//          <Data>{assetQuantity}</Data>
//          <Data>{assetType === 'OTHERS' ? assetTypeOthers : assetType}</Data>
//          <Data>{assetSensitivity}</Data>
//          <Data>
//             {deliverTo}
//             <br />
//             {receiverPhoneNumber}{' '}
//          </Data>
//          <Data>
//             {isAccepted ? (
//                <Accepted>
//                   <img
//                      alt='completed'
//                      src={Images.correctIcon}
//                      width='12px'
//                      height='10px'
//                   />
//                </Accepted>
//             ) : (
//                <AcceptRequest onClick={onAcceptRequest}>
//                   <img
//                      alt='add'
//                      src={Images.addIcon}
//                      width='12px'
//                      height='10px'
//                   />
//                </AcceptRequest>
//             )}
//          </Data>
//       </Row>
//    )
// })

export { EachRow }
