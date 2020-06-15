import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../themes/Colors'
import { Typo12SteelHKGroteskSemiBold } from '../../styleGuide/Typos'

const DateInput = styled.div`
   display: ${props => (props.shouldShow ? 'flex' : 'none')};
   ${tw`text-sm  flex-col mt-4`};
`
const Label = styled.label`
   color: ${Colors.steel};
   ${Typo12SteelHKGroteskSemiBold};
`
const Error = styled.span`
   display: ${props => (props.isError ? 'block' : 'none')};
   color: red;
   ${tw``};
   ${Typo12SteelHKGroteskSemiBold};
`
const Required = styled.span`
   display: ${props => (props.isRequired ? 'flex' : 'none')};
   color: ${Colors.neonRed};
   ${tw``};
`

export { DateInput, Label, Error, Required }
