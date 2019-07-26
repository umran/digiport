const { GraphQLInterfaceType, GraphQLID, GraphQLString } = require('graphql')
const { GraphQLDateTime } = require('graphql-iso-date')

const NODE_TYPE = new GraphQLInterfaceType({
  name: '_node',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    last_modified: {
      type: GraphQLDateTime
    },
    name: {
      type: GraphQLString
    }
  })
})

module.exports = NODE_TYPE