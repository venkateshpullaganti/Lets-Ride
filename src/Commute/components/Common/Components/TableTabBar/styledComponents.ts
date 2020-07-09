import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../../../Common/themes/Colors'
interface NavBtnProps {
   isSelected: boolean
}

const RequestsContainer = styled.div`
   ${tw``};
`
const Navigator = styled.div`
   border-bottom: 1px solid ${Colors.steel60};

   ${tw`my-4`};
`
const NavBtn = styled.button`
   font-size: 12px;
   height: 100%;
   ${(props: NavBtnProps) =>
      props.isSelected
         ? `border-bottom: 2px solid ${Colors.brightBlue};
         color:${Colors.darkBlueGrey}`
         : `color:${Colors.steel60}`}

   ${tw`mx-6 font-semibold pb-2`};
   &:focus {
      outline: none;
   }
`

export { RequestsContainer, Navigator, NavBtn }
