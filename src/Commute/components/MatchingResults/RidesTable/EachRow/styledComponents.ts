import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../../../Common/themes/Colors'

const Row = styled.div`
   height: 64px;
   border: 1px solid ${Colors.lightBlueGrey40};
   ${tw`flex p-2`};
`
const Data = styled.div`
   color: ${Colors.steel};
   width: 14.28%;
   ${tw`flex justify-center items-center`};
`

const StatusCircle = styled.div`
   ${tw`rounded-full  flex justify-center items-center`};
   width: 32px;
   height: 32px;
`
const Accepted = styled(StatusCircle)`
   ${tw``};
   border: 1px solid ${Colors.greenishTeal};
`
const AcceptRequest = styled(StatusCircle)`
   ${tw`cursor-pointer`};
   border: 1px solid ${Colors.lightBlueGrey};
`

export { Row, Data, AcceptRequest, Accepted }
