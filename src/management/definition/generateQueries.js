const { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql')
const { GraphQLDateTime } = require('graphql-iso-date')
const { DEFINITION_TYPE, DEFINITION_STATE_TYPE } = require('./outputTypes')

const generateQueries = resolver => ({
  list_definition: {
    type: new GraphQLList(DEFINITION_TYPE),
    args: {
      id: {
        type: GraphQLID
      },
      state: {
        type: DEFINITION_STATE_TYPE
      },
      last_modified: {
        type: GraphQLDateTime
      },
      name: {
        type: GraphQLString
      }
    },
    resolve: async (source, args, context) => {
      return await resolver({
        source,
        args,
        context,
        method: 'list_definition'
      })
    }
  }
})

module.exports = generateQueries