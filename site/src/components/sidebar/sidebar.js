import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

const Headings = ({ headings = [] }) =>
  headings &&
  headings.length > 0 && (
    <List>
      {headings
        .filter(e => e.depth > 1)
        .map(element => (
          <Item
            key={element.value}
            style={{
              paddingLeft:
                element.depth > 1 ? `${(element.depth - 1) * 12}px` : undefined,
            }}
          >
            <Anchor
              href={`#${element.value
                .toLowerCase()
                .trim()
                .replace(/[\W]/g, '-')}`}
            >
              {element.value}
            </Anchor>
          </Item>
        ))}
    </List>
  )
const SidebarList = ({ items = [], nesting = 0, headings, location }) =>
  items &&
  items.length > 0 && (
    <List>
      {items.map(node => {
        return (
          <>
            <Item
              key={node.link}
              className={
                location.pathname.replace(/\/$/, '') ===
                node.link.replace(/\/$/, '')
                  ? 'active'
                  : ''
              }
              style={{ paddingLeft: nesting ? `${nesting * 12}px` : undefined }}
            >
              <Anchor href={`${node.link}`}>{node.label}</Anchor>
            </Item>
            {location.pathname.replace(/\/$/, '') ===
            node.link.replace(/\/$/, '') ? (
              <Headings headings={headings} />
            ) : null}
            <SidebarList
              items={node.items}
              nesting={nesting + 1}
              headings={headings}
              location={location}
            />
          </>
        )
      })}
    </List>
  )

const Sidebar = ({ content, sidebar, location }) => {
  return (
    <StaticQuery
      query={query}
      render={data => (
        <View>
          <Title>
            <img
              src={data.site.siteMetadata.logo}
              alt={data.site.siteMetadata.title}
            />{' '}
            {data.site.siteMetadata.title}
          </Title>
          <SidebarList
            items={sidebar.edges.map(({ node }) => node)}
            headings={content.headings}
            location={location}
          />
        </View>
      )}
    />
  )
}

export default Sidebar

const query = graphql`
  query SiteQuery {
    site {
      siteMetadata {
        title
        logo
      }
    }
  }
`

const View = styled.div`
  bottom: 0;
  display: block;
  position: fixed;
  background-color: #f5f7f9;
  left: 0;
  overflow-y: auto;
  top: 0;
  width: 230px;
`
const Title = styled.h1`
  background-color: #f5f7f9;
  color: #5c6975;
  font-size: 20px;
  height: 56px;
  margin: 0;
  justify-content: center;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  border-bottom: 1px solid #ccc;
  img {
    max-height: 40px;
    margin-right: 12px;
    display: inline-block;
  }
`

const List = styled.ul`
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
  //margin-block-start: 1em;
  //margin-block-end: 1em;
  //margin-inline-start: 0px;
  //margin-inline-end: 0px;
  //padding-inline-start: 40px;
`

const Item = styled.li`
  // color: #5C6975;
  display: list-item;
  &:hover,
  &.active {
    background-color: #68c643;
    color: white;
    a {
      color: white;
    }
  }
`
const Anchor = styled.a`
  line-height: 28px;
  padding: 0 15px 0 15px;
  display: block;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: none;
  color: #5c6975;
  transition-property: background;
  transition-timing-function: linear;
  transition-duration: 130ms;
`
