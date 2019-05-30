import React from 'react'
import styled from 'styled-components'
import { renderNodes } from '../../node-renderer'
import { Heading1 } from '../heading';
import CodeBox from '../code-box'

const Page = ({ content, location }) => {
  // Get selected language from url
  const lang = content.frontmatter.language_tabs ? (location.search.replace('?', '') || content.frontmatter.language_tabs[0]) : []
  return (
    <View>
      <CodeBox content={content} lang={lang} location={location}/>
      <Content>{renderNodes(content.htmlAst.children, lang)}</Content>
    </View>
  )
}

export default Page

const View = styled.div`
  background-color: #fafafa;
  display: block;
  margin-left: 230px;
  min-height: 100%;
  padding-bottom: 1rem;
  position: relative;
  z-index: 10;
  padding-top: 1em;

  ${Heading1}:first-child {
    margin-top: -0.5em !important;
  }
`

const Content = styled.div`
  display: block;
  position: relative;
  z-index: 30;
  // Fix full height for background color
  &:after {
    content: '';
    display: block;
    clear: both;
  }
`
