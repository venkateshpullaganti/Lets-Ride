import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../themes/Colors'

const DateInput = styled.div`
   ${tw`text-sm`};
`
const Label = styled.label`
   color: ${Colors.steel};
`
const Picker = styled.span`
   ${tw``};
`

export { DateInput, Label, Picker }
