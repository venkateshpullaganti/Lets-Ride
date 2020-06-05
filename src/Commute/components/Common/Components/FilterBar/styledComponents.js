import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../../../Common/themes/Colors'

const Bar = styled.div`
   ${tw`flex justify-between my-2 `};
`
const TaskCount = styled.p`
   ${tw`m-2 flex`};
`
const Filters = styled.div`
   ${tw`flex`};
`

export { Bar, TaskCount, Filters }
