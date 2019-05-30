import styled from 'styled-components'

import { Aside } from './components/aside'
import { Blockquote } from './components/blockquote'
import { Default } from './components/default'
import { Div } from './components/div'
import { Img } from './components/img'
import { Kbd } from './components/kbd'
import { Code } from './components/code'
import { Ul } from './components/ul'
import { Li } from './components/li'
import { Heading1, Heading2, Heading3 } from './components/heading'
import { Link } from './components/link'
import { Paragraph } from './components/paragraph'
import { Pre } from './components/pre'
import { Span, Strong, Italic, Small } from './components/span'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeading,
  TableRow,
} from './components/table'

export const Nodes = {
  a: Link,
  aside: Aside,
  blockquote: Blockquote,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  code: Code,
  div: Div,
  ul: Ul,
  li: Li,
  img: Img,
  kbd: Kbd,
  pre: Pre,
  span: Span,
  strong: Strong,
  small: Small,
  i: Italic,
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  th: TableHeading,
  tr: TableRow,
  td: TableCell,
  hr: styled.hr`border: none; border-bottom: 1px solid rgba(0,0,0,0.1)`,
  em: styled.em``,
  cite: styled.cite``,
  default: Default,
}
