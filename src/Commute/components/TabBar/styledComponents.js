import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../Common/themes/Colors'

const Tabs = styled.ul`
   button:first-of-type {
      border-radius: 6px 0px 0px 6px;
   }
   button:last-of-type {
      border-radius: 0px 6px 6px 0px;
   }
   box-sizing: border-box;
   ${tw`flex items-center justify-center my-12 `};
`
const Tab = styled.button`
   border: 1px solid ${Colors.lightBlueGrey};
   ${props =>
      props.isSelected
         ? `color:${Colors.white};background:${Colors.brightBlue}`
         : `color:${Colors.darkBlueGrey};background:${Colors.white}`};
   ${tw`p-2 focus:outline-none`};
`

export { Tabs, Tab }
