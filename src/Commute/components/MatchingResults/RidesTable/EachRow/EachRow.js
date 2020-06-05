import React from 'react'
import { observer } from 'mobx-react'
import { API_SUCCESS, API_FAILED } from '@ib/api-constants'
import { reaction } from 'mobx'

import Images from '../../../../../Common/themes/Images'
import { displayToaster } from '../../../../../Common/components/Toaster'
import strings from '../../../../i18n/strings.json'

import { Row, Data, Accepted, AcceptRequest } from './styledComponents'
@observer
class EachRow extends React.Component {
   onClickAddBtn = () => {
      const { acceptRequest } = this.props.row
      acceptRequest()
   }

   successReaction = reaction(
      () => {
         return this.props.row.rideRequestApiStatus === API_SUCCESS
      },
      boole => {
         setTimeout(() => {
            displayToaster(strings.rideAcceptedSuccessfully, false)

            this.props.renderTable()
         }, 500)
      }
   )

   failureReaction = reaction(
      () => {
         return this.props.row.rideRequestApiError
      },
      error => {
         displayToaster(strings.somethingWentWrong, true, error)
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
         seatCount,
         laguageCount,
         requestedPerson,
         requestedPersonMobile,
         isAccepted
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

export { EachRow }
