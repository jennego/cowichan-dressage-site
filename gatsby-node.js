/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

async function createEvents(graphql, actions) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allContentfulEvent {
        edges {
          node {
            eventName
            id
            slug
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const pageEdges = (result.data.allContentfulEvent || {}).edges || []

  pageEdges.forEach((edge, index) => {
    const { id, slug, eventName } = edge.node
    const path = `/event/${slug}/`

    createPage({
      path,
      component: require.resolve("./src/templates/event.js"),
      context: {
        id,
        eventName,
        // prev: index === 0 ? null : pageEdges[index - 1].node,
        // next: index === pageEdges.length - 1 ? null : pageEdges[index + 1].node,
      },
    })
  })
}

async function createEventEntries(graphql, actions) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allContentfulEvent {
        edges {
          node {
            eventName
            id
            slug
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const pageEdges = (result.data.allContentfulEvent || {}).edges || []

  pageEdges.forEach((edge, index) => {
    const { id, slug, eventName } = edge.node
    const path = `/event/${slug}/entry`

    createPage({
      path,
      component: require.resolve("./src/templates/entry.js"),
      context: {
        id,
        eventName,
        // prev: index === 0 ? null : pageEdges[index - 1].node,
        // next: index === pageEdges.length - 1 ? null : pageEdges[index + 1].node,
      },
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  await createEvents(graphql, actions)
  await createEventEntries(graphql, actions)
}
