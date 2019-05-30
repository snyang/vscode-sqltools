import React from 'react'
import styled from 'styled-components'

import LanguageSelector from './language-selector'

const CodeBox = ({ content, lang, location }) => {
  const languages = content.frontmatter.language_tabs
  return (
    <View>
      <LanguageSelector
        languages={languages}
        lang={lang}
        path={location.pathname}
      />
      <ins
        className="adsbygoogle"
        style={{ display: 'inline-block', width: '728px', height: '90px' }}
        data-ad-client="ca-pub-5709380760133214"
        data-ad-slot="1234567890"
      />
    </View>
  )
}

export default CodeBox

const View = styled.div`
  background-color: #2e3336;
  bottom: 0;
  display: block;
  font-size: 14px;
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
`
