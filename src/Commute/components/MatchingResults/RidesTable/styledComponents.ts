import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../../Common/themes/Colors'

const TableContainer = styled.div`
   border: 1px solid ${Colors.lightBlueGrey};
   ${tw`m-2 `};
`
const Col = styled.div`
   color: ${Colors.steel};
   width: 14.2%;
   ${tw`text-center`};
`
const Header = styled.div`
   height: 64px;
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

export { TableContainer, Col, Header, TableFooter, AddRequest, TotalPages }
