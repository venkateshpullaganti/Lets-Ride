import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../Common/themes/Colors'

const MatchingResultsRoot = styled.div`
   ${'' /* border: 1px solid green; */}
   ${tw``};
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

export { MatchingResultsRoot, RequestTable, Col, RequestsHeader }
