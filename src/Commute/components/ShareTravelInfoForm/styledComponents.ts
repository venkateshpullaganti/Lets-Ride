import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../Common/themes/Colors'

const AssetRequest = styled.div`
   background: ${Colors.whiteTwo};
   ${tw`flex flex-col`};
`
const Form = styled.form`
   width: 490px;
   background: ${Colors.white};
   padding: 50px;
   border-radius: 6px;
   box-sizing: border-box;
   ${tw`flex m-4 items-start flex-col self-center shadow-2xl`};
`
const Label = styled.label`
   ${tw``};
`

export { AssetRequest, Form, Label }
