import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../../../Common/themes/Colors'

const RequestsContainer = styled.div`
   ${'' /* border: 1px solid green; */}
   ${tw``};
`
const Navigator = styled.div`
   border-bottom: 1px solid ${Colors.steel60};
   ${tw`my-4`};
`
const NavBtn = styled.button`
   font-size: 12px;
   height: 100%;
   ${props =>
      props.isSelected
         ? `border-bottom: 2px solid ${Colors.brightBlue};
         color:${Colors.darkBlueGrey}`
         : `color:${Colors.steel60}`}

   ${tw`mx-6 font-semibold pb-2`};
   &:focus {
      outline: none;
   }
`
const RequestTable = styled.div`
   border: 1px solid ${Colors.lightBlueGrey};
   ${tw`m-2 `};
`
const Col = styled.div`
   color: ${Colors.steel};
   height: 48px;
   width: 130px;
   ${tw`text-center`};
`
const RequestsHeader = styled.div`
   height: 64px;
   border: 1px solid ${Colors.lightBlueGrey};
   ${tw`flex p-2 justify-between items-center`};
`

export {
   RequestsContainer,
   Navigator,
   NavBtn,
   RequestTable,
   Col,
   RequestsHeader
}
