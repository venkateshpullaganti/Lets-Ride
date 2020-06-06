import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import { Typo32DarkBlueGreyRubikRegular } from '../../styleGuide/Typos'

const Heading = styled.div`
   ${Typo32DarkBlueGreyRubikRegular};
   ${tw`flex flex-wrap text-2xl my-4`};
`

export { Heading }
