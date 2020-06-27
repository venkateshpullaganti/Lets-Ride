import styled from '@emotion/styled'
import tw from 'tailwind.macro'

interface InputProps {
   isError: boolean
}

export const Wrapper = styled.div`
   ${tw`flex flex-col`};
`
export const Input = styled.input`
   ${(props: InputProps) =>
      props.isError ? `border:1px solid red` : `border:1px solid grey`};
   ${tw``};
`
export const Label = styled.label`
   ${tw`mr-2`};
`
export const Error = styled.span`
   ${tw`text-red-500`};
`
