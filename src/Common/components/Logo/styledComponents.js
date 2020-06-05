import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const CustomLogo = styled.img`
   width: ${props => props.width};
   height: ${props => props.height};
   ${tw`cursor-pointer`}
`
