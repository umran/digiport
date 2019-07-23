const { GraphQLInterfaceType, GraphQLID } = require('graphql')

const NODE_TYPE = new GraphQLInterfaceType({
  name: '_node',
  fields: () => ({
    id: {
      type: GraphQLID
    }
  })
})

module.exports = NODE_TYPE