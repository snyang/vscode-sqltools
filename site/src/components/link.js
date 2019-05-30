import styled from 'styled-components'

export const Link = styled.a.attrs(({ href }) => ({
  target: href.indexOf('http') === 0 ? '_blank' : undefined,
}))`
  text-decoration: none;
  font-weight: bold;
  color: #68c643;
`;
