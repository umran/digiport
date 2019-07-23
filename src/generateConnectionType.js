const { GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql')

const PAGE_INFO_TYPE = new GraphQLObjectType({
  name: '_page_info',
  fields: () => ({
    last_cursor: {
      type: GraphQLString
    }
  })
})

const generateConnectionType = outputType => {
  const edgeType = new GraphQLObjectType({
    name: `${outputType.toString()}_edge`,
    fields: () => ({
      cursor: {
        type: GraphQLString
      },
      node: {
        type: outputType
      }
    })
  })

  const connectionType = new GraphQLObjectType({
    name: `${outputType.toString()}_connection`,
    fields: () => ({
      page_info: {
        type: PAGE_INFO_TYPE
      },
      edges: {
        type: new GraphQLList(edgeType)
      }
    })
  })

  return connectionType
}

module.exports = generateConnectionType