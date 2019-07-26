const { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLString } = require('graphql')
const { GraphQLDateTime } = require('graphql-iso-date')
const { BUCKET_TYPE, BUCKET_STATE_TYPE } = require('./outputTypes')

const generateQueries = resolver => ({
  list_bucket: {
    type: new GraphQLList(BUCKET_TYPE),
    args: {
      id: {
        type: GraphQLID
      },
      state: {
        type: BUCKET_STATE_TYPE
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
        method: "list_bucket"
      })
    }
  }
})

module.exports = generateQueries