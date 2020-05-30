import styled from '@emotion/styled'
import tw from 'tailwind.macro'

const DatePickers = styled.div`
   height: ${props => (props.shouldShow ? `initial` : `0px`)};
   visibility: ${props => (props.shouldShow ? 'visible' : 'hidden')};
   ${tw`flex items-center m-2`};
`
const FlexibleContainer = styled.div`
   ${tw`flex flex-wrap items-center my-2`};
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
