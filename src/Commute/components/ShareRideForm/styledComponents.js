import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../Common/themes/Colors'

const ShareRide = styled.div`
   height: 100vh;
   background: ${Colors.whiteTwo};
   ${tw`flex flex-col`};
`
const Form = styled.form`
   max-height: 656px;
   max-width: 497px;
   background: ${Colors.white};
   padding: 50px;
   border-radius: 6px;
   box-sizing: border-box;
   ${tw`flex m-4 items-start flex-col  mx-auto shadow-2xl`};
`

export { ShareRide, Form }
