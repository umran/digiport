const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString, GraphQLNonNull } = require('graphql')
const RESULT_TYPE = require('../resultType')

const generateMutations = resolver => ({
  create_bucket: {
    type: RESULT_TYPE,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async (source, args, context) => {
      return await resolver({
        source,
        args,
        context,
        method: 'create_bucket'
      })
    }
  },
  disable_bucket: {
    type: RESULT_TYPE,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (source, args, context) => {
      return await resolver({
        source,
        args,
        context,
        method: 'disable_bucket'
      })
    }
  },
  enable_bucket: {
    type: RESULT_TYPE,
    args: {
      _id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (source, args, context) => {
      return await resolver({
        source,
        args,
        context,
        method: 'enable_bucket'
      })
    }
  },
  delete_bucket: {
    type: RESULT_TYPE,
    args: {
      _id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (source, args, context) => {
      return await resolver({
        source,
        args,
        context,
        method: 'delete_bucket'
      })
    }
  }
})

module.exports = generateMutations