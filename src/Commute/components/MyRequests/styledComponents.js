import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../Common/themes/Colors'

const RequestsContainer = styled.div`
   ${'' /* border: 1px solid green; */}
   ${tw``};
`
const Navigator = styled.div`
   height: 25px;
   border-bottom: 1px solid ${Colors.steel};
   ${tw``};
`
const NavBtn = styled.button`
   ${'' /* height: 16px; */}
   ${props =>
      props.isSelected
         ? `border-bottom: 2px solid ${Colors.brightBlue};
         color:${Colors.darkBlueGrey}`
         : `color:${Colors.steel60}`}
   padding-bottom: 2px;
   font-size: 12px;
   ${tw`px-2 font-semibold`};
   &:focus {
      outline: none;
   }
`
const RequestTable = styled.div`
   border: 1px solid ${Colors.lightBlueGrey40};
   ${tw`m-2 shadow-lg`};
`
const Col = styled.div`
   color: ${Colors.steel};
   height: 48px;
   width: 130px;
   ${tw`text-center`};
`
const RequestsHeader = styled.div`
   height: 64px;
   border: 1px solid ${Colors.lightBlueGrey40};
   ${tw`flex p-2 justify-between items-center`};
`
const TableFooter = styled.div`
   color: ${Colors.steel};
   ${tw`flex justify-between`};
`
const AddRequest = styled.button`
   ${tw``};
`
const TotalPages = styled.div`
   ${tw``};
`

export {
   RequestsContainer,
   Navigator,
   NavBtn,
   RequestTable,
   Col,
   RequestsHeader,
   TableFooter,
   AddRequest,
   TotalPages
}
