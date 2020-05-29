import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../themes/Colors'

const DateInput = styled.div`
   display: ${props => (props.shouldShow ? 'flex' : 'none')};
   ${tw`text-sm  flex-col mt-4`};
`
const Label = styled.div`
   color: ${Colors.steel};
`
const Error = styled.span`
   display: ${props => (props.isError ? 'block' : 'none')};
   color: red;
   ${tw`text-sm`};
`
const Required = styled.span`
   visibility: ${props => (props.isRequired ? 'visible' : 'hidden')};
   color: ${Colors.neonRed};
   ${tw``};
`

export { DateInput, Label, Error, Required }
