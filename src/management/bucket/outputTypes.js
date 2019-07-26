const { GraphQLObjectType, GraphQLEnumType, GraphQLList, GraphQLID, GraphQLString, GraphQLBoolean } = require('graphql')
const { GraphQLDateTime } = require('graphql-iso-date')
const NODE_TYPE = require('../nodeType')

const BUCKET_STATE_TYPE = new GraphQLEnumType({
  name: '_bucket_state',
  values: {
    enabled: { value: "enabled" },
    disabled: { value: "disabled" },
    deleted: { value: "deleted" }
  }
})

const BUCKET_TYPE = new GraphQLObjectType({
  name: '_bucket',
  fields: () => ({
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
  }),
  interfaces: [NODE_TYPE]
})

module.exports = {
  BUCKET_TYPE,
  BUCKET_STATE_TYPE
}