const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const pagesTemplate = path.resolve(`src/templates/pages.js`)

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    // console.dir(result,{ depth: 7});

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: pagesTemplate,
        context: {}, // additional data can be passed via context
      })
    })
  })
}
