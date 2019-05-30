import React from 'react'
import { graphql } from 'gatsby'
import '../components/index.css'

import SEO from '../components/seo'

import Sidebar from '../components/sidebar'
import Page from '../components/page'

const Template = ({ location, data: { content, sidebar } }) => {
  return (
    <>
      <SEO title={content.frontmatter.title}/>
      <Sidebar content={content} sidebar={sidebar} location={location} />
      <Page content={content} location={location} />
    </>
  )
}

export default Template

export const query = graphql`
  query($path: String!) {
    content: markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        language_tabs
        title
      }
      headings {
        value
        depth
      }
      htmlAst
    }
    sidebar: allSidebarJson {
      edges {
        node {
          label
          link
          items {
            label
            link
          }
        }
      }
    }
  }
`
