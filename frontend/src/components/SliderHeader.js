import React from 'react'
import { withTranslation } from 'react-i18next' // Import withTranslation

import a from '../assets/h.png'

const SliderHeader = ({ t }) => {
  // Inject the t function as a prop
  return (
    <div className='banner'>
      <div className='banner-content'>
        <h2>{t('Welcome to Amina Shop')}</h2>
        <h3>
          {t(
            'Discover unique fashion pieces crafted with elegance and style. Find the perfect attire for every occasion.'
          )}
        </h3>
      </div>
      <img src={a} alt='' />
    </div>
  )
}

export default withTranslation()(SliderHeader) // Wrap the SliderHeader component with withTranslation HOC
