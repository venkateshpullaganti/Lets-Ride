import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../Common/themes/Colors'

const DatePickers = styled.div`
   width: 100%;
   height: ${props => (props.shouldShow ? `initial` : `0px`)};
   visibility: ${props => (props.shouldShow ? 'visible' : 'hidden')};
   ${tw`flex justify-between my-2`};
`
const FlexibleContainer = styled.div`
   color: ${Colors.steel};
   ${tw`flex flex-wrap items-start my-2`};
`
const Checkbox = styled.input`
   ${tw`mr-2`};
`
const Error = styled.span`
   visibility: ${props => (props.isError ? 'visible' : 'hidden')};
   ${tw`text-red-500`};
`
const CheckboxContainer = styled.div`
   ${tw``};
`
export { DatePickers, FlexibleContainer, Checkbox, Error, CheckboxContainer }
