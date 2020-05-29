import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../../Common/themes/Colors'

const Row = styled.div`
   height: 64px;
   border: 1px solid ${Colors.lightBlueGrey40};
   ${tw`flex justify-between items-center p-2`};
`
const Data = styled.div`
   color: ${Colors.steel};
   height: 48px;
   width: 130px;
   ${tw``};
`
const Badge = styled.div`
   height: 18px;
   width: 80px;
   background: ${props =>
      props.isConfirmed ? `${Colors.greenishTeal}` : `${Colors.yellowOrange}`};
   border-radius: 10px;
   ${tw`text-xs flex items-center justify-center pb-1`};
`

export { Row, Data, Badge }
