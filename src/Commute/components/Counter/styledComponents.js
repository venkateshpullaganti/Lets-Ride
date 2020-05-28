import styled from '@emotion/styled'
import tw from 'tailwind.macro'

const Btn = styled.button`
   height: 40px;
   width: 40px;
   border: 1px solid lightgrey;
   ${tw``};
   &:focus {
      outline: none;
   }
`

const CounterContainer = styled.div`
   ${tw`flex m-1`};
`
const Label = styled.label`
   margin-right: 15px;
   ${tw``}
`
const Input = styled.input`
   height: 40px;
   width: 45px;
   border: 1px solid lightgrey;
   ${tw`text-center pl-2`};
   &:focus {
      outline: none;
   }
`
export { Btn, CounterContainer, Label, Input }
