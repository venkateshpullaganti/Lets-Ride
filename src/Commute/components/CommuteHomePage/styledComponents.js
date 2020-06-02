import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../Common/themes/Colors'

const Root = styled.div`
   background: ${Colors.whiteTwo};
   ${tw``};
`
const Body = styled.div`
   ${tw`p-2`};
`
export { Root, Body }
