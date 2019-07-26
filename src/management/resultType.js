const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')

const RESULT_TYPE = new GraphQLObjectType({
  name: '_result',
  fields: () => ({
    status: {
      type: GraphQLString
    },
    message: {
      type: GraphQLString
    },
    id: {
      type: GraphQLID
    }
  })
})

module.exports = RESULT_TYPE