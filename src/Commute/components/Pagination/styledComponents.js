import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../Common/themes/Colors'

const Navigator = styled.div`
   color: ${Colors.steel};
   ${tw`flex`};
`
const Arrow = styled.button`
   height: 24px;
   width: 24px;
   border: 1px solid ${Colors.steel};
   ${tw`mx-1 text-center`};
`
const Page = styled.div`
   height: 24px;
   width: 24px;
   border: 1px solid ${Colors.steel};
   ${tw`mx-1 text-center`};
`

export { Navigator, Arrow, Page }
