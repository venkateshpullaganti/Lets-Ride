import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../Common/themes/Colors'

const RideRequest = styled.div`
   height: 100vh;
   background: ${Colors.whiteTwo};
   ${tw`flex flex-col`};
`
const Form = styled.form`
   height: 400px;
   width: 300px;
   max-height: 656px;
   max-width: 497px;
   background: ${Colors.white};
   padding: 48px 38px 48px 58px;
   border-radius: 6px;
   margin-top: 80px;
   box-sizing: content-box;
   ${tw`flex items-center flex-col self-center shadow-2xl`};
`

export { RideRequest, Form }
