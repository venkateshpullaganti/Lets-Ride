import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../Common/themes/Colors'

const RideRequest = styled.div`
   background: ${Colors.whiteTwo};
   ${tw`flex flex-col`};
`
const Form = styled.form`
   width: 500px;
   background: ${Colors.white};
   padding: 50px;
   border-radius: 6px;
   box-sizing: border-box;
   ${tw`flex mx-auto my-4 items-start  flex-col self-center shadow-lg`};
`

export { RideRequest, Form }
