import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../themes/Colors'

const DateInput = styled.div`
   ${tw``};
`
const Label = styled.label`
   color: ${Colors.steel};
   margin-left: 0px;
   margin-right: 4px;
`

export { DateInput, Label }
