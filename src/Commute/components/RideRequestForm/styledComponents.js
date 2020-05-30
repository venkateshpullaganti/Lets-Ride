import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../Common/themes/Colors'

const RideRequest = styled.div`
   height: 100vh;
   background: ${Colors.whiteTwo};
   ${tw`flex flex-col`};
`
const Form = styled.form`
   width: 450px;
   background: ${Colors.white};
   padding: 50px;
   border-radius: 6px;
   box-sizing: content-box;
   ${tw`flex m-4 items-start  flex-col self-center shadow-2xl`};
`

export { RideRequest, Form }
