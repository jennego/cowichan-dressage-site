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
    const path = `/events/${slug}`

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

async function createResultPages(graphql, actions) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allContentfulEventDate {
        edges {
          node {
            date
            id
            event {
              eventName
              id
            }
            results {
              title
              file {
                url
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const pageEdges = (result.data.allContentfulEventDate || {}).edges || []

  pageEdges.forEach((edge, index) => {
    const { id, date, results, event } = edge.node
    const path = `/${date}/results`

    createPage({
      path,
      component: require.resolve("./src/templates/results.js"),
      context: {
        id,
        results,
        date,
        event,
        // prev: index === 0 ? null : pageEdges[index - 1].node,
        // next: index === pageEdges.length - 1 ? null : pageEdges[index + 1].node,
      },
    })
  })
}

async function createTimesPages(graphql, actions) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allContentfulEventDate {
        edges {
          node {
            date
            id
            event {
              eventName
              id
            }
            rideTimes {
              title
              file {
                url
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const pageEdges = (result.data.allContentfulEventDate || {}).edges || []

  pageEdges.forEach((edge, index) => {
    const { id, date, rideTimes, event } = edge.node
    const path = `/${date}/ride-times`

    createPage({
      path,
      component: require.resolve("./src/templates/ride-times.js"),
      context: {
        id,
        rideTimes,
        date,
        event,
        // prev: index === 0 ? null : pageEdges[index - 1].node,
        // next: index === pageEdges.length - 1 ? null : pageEdges[index + 1].node,
      },
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  await createEvents(graphql, actions)
  // await createResultPages(graphql, actions)
  // await createTimesPages(graphql, actions)
}
