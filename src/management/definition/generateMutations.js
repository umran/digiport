const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString, GraphQLNonNull } = require('graphql')
const RESULT_TYPE = require('../resultType')
const { FIELD_INPUT_TYPE } = require('./inputTypes')

const generateMutations = resolver => ({
  create_definition: {
    type: RESULT_TYPE,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      fields: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(FIELD_INPUT_TYPE)))
      }
    },
    resolve: async (source, args, context) => {
      return await resolver({
        source,
        args,
        context,
        method: 'create_definition'
      })
    }
  },
  update_definition: {
    type: RESULT_TYPE,
    args: {
      _id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      fields: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(FIELD_INPUT_TYPE)))
      }
    },
    resolve: async (source, args, context) => {
      return await resolver({
        source,
        args,
        context,
        method: 'update_definition'
      })
    }
  },
  disable_definition: {
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
        method: 'disable_definition'
      })
    }
  },
  enable_definition: {
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
        method: 'enable_definition'
      })
    }
  },
  delete_definition: {
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
        method: 'delete_definition'
      })
    }
  }
})

module.exports = generateMutations