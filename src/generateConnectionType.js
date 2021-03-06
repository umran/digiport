const { GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql')

const PAGE_INFO_TYPE = new GraphQLObjectType({
  name: '_page_info',
  fields: () => ({
    cursor: {
      type: GraphQLString
    }
  })
})

const generateConnectionType = outputType => {
  const connectionType = new GraphQLObjectType({
    name: `${outputType.toString()}_connection`,
    fields: () => ({
      page_info: {
        type: PAGE_INFO_TYPE
      },
      items: {
        type: new GraphQLList(outputType)
      }
    })
  })

  return connectionType
}

module.exports = generateConnectionType