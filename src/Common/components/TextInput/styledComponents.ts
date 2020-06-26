import styled from '@emotion/styled'
import tw from 'tailwind.macro'

interface WrapperProps {
   isError: boolean
}

export const Wrapper = styled.div`
   ${(props: WrapperProps) =>
      props.isError ? `border:1px solid red` : `border:1px solid transparent`}
   ${tw``};
`
export const Input = styled.input`
   ${tw``};
`
export const Label = styled.label`
   ${tw``};
`
