import React, { Component } from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'

import { Button, Wrapper } from './styledComponents.'

class ChangeLanguageButtons extends Component<WithTranslation> {
   changeLanguage = (lan: string) => {
      const { i18n } = this.props
      i18n.changeLanguage(lan)
   }

   render() {
      return (
         <Wrapper>
            <Button
               className='bg-blue-500'
               onClick={() => this.changeLanguage('en')}
            >
               English
            </Button>
            <Button
               className='bg-green-500'
               onClick={() => this.changeLanguage('tel')}
            >
               Telugu
            </Button>
         </Wrapper>
      )
   }
}

export default withTranslation('translate')(ChangeLanguageButtons)
