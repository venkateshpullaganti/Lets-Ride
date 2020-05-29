import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../Common/themes/Colors'

const TableContainer = styled.div`
   border: 1px solid ${Colors.lightBlueGrey40};
   ${tw`m-2 shadow-lg`};
`
const Col = styled.div`
   color: ${Colors.steel};
   height: 48px;
   width: 130px;
   ${tw``};
`
const Header = styled.div`
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
   TableContainer,
   Col,
   Header,
   TableFooter,
   AddRequest,
   TotalPages
}
