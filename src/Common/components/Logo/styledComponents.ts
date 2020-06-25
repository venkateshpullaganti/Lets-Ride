import styled from '@emotion/styled'
import tw from 'tailwind.macro'

interface CustomLogoProps {
   width: string
   height: string
}

export const CustomLogo = styled.img`
   width: ${(props: CustomLogoProps) => props.width};
   height: ${(props: CustomLogoProps) => props.height};
   ${tw`cursor-pointer`}
`
