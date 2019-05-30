import { Nodes } from './node-mapping'

const fixHref = href => {
  if (href.indexOf('http') === 0) return href;
  if (href.indexOf('/') === 0) return href.toLowerCase().replace(/\.md$/gi, '');
  return `/${href}`.toLowerCase().replace(/\.md$/gi, '');
}

export const renderNodes = (nodes = [], lang) => {  return nodes.map((node, index) => {
    if (node.type === 'element') {
      const tag = Nodes[node.tagName] || Nodes['default']
      if (tag === Nodes['default']) {
        console.warn(`Node renderer for ${node.tagName}`, node);
      }

      switch (node.tagName) {
        case 'img':
        case 'hr':
          return tag.render({
            ...node.properties,
            key: index,
          });
        case 'a':
          return tag.render({
            children: renderNodes(node.children),
            href: fixHref(node.properties.href),
            key: index,
          });
        default:
          const language = node.properties && node.properties.dataLanguage
          // Check for code language examples
          const active = language === 'json' || language === lang
          // Get anchor id's for headings
          let id =
            (['h1', 'h2', 'h3'].indexOf(node.tagName) !== -1 &&
              node.children &&
              node.children[0] &&
              node.children[0].value &&
              node.children[0].value.toLowerCase()) ||
            undefined
          if (id) {
            id = id.trim().replace(/\W/g, '-');
          }
          return tag.render({
            children: node.children ? renderNodes(node.children) : undefined,
            className: node.properties.className,
            active,
            key: index,
            id,
          });
      }

    } else if (node.type === 'text') {
      return node.value
    }
    return null
  })
}
