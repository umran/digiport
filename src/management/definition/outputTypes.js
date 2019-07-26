const { GraphQLObjectType, GraphQLEnumType, GraphQLList, GraphQLID, GraphQLString, GraphQLBoolean } = require('graphql')
const { GraphQLDateTime } = require('graphql-iso-date')
const NODE_TYPE = require('../nodeType')

const FIELD_TYPE_TYPE = new GraphQLEnumType({
  name: '_field_type',
  values: {
    string: { value: "string" },
    integer: { value: "integer" },
    float: { value: "float" },
    boolean: { value: "boolean" },
    date: { value: "date" },
    object: { value: "object" },
    reference: { value: "reference" },
    array: { value: "array" }
  }
})

const FIELD_OPTIONS_TYPE = new GraphQLObjectType({
  name: '_field_options',
  fields: () => ({
    required: {
      type: GraphQLBoolean
    }
  })
})

const FIELD_ITEM_TYPE = new GraphQLObjectType({
  name: '_field_item',
  fields: () => ({
    name: {
      type: GraphQLString
    },
    type: {
      type: FIELD_TYPE_TYPE
    },
    reference: {
      type: GraphQLString
    },
    fields: {
      type: new GraphQLList(FIELD_TYPE)
    }
  })
})

const FIELD_STATE_TYPE = new GraphQLEnumType({
  name: '_field_state',
  values: {
    enabled: { value: "enabled" },
    disabled: { value: "disabled" }
  }
})

const FIELD_TYPE = new GraphQLObjectType({
  name: '_field',
  fields: () => ({
    name: {
      type: GraphQLString
    },
    type: {
      type: FIELD_TYPE_TYPE
    },
    reference: {
      type: GraphQLString
    },
    item: {
      type: FIELD_ITEM_TYPE
    },
    fields: {
      type: new GraphQLList(FIELD_TYPE)
    },
    options: {
      type: FIELD_OPTIONS_TYPE
    },
    state: {
      type: FIELD_STATE_TYPE
    }
  })
})

const DEFINITION_STATE_TYPE = new GraphQLEnumType({
  name: '_definition_state',
  values: {
    enabled: { value: "enabled" },
    disabled: { value: "disabled" },
    deleted: { value: "deleted" }
  }
})

const DEFINITION_TYPE = new GraphQLObjectType({
  name: '_definition',
  fields: () => ({
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
    },
    fields: {
      type: new GraphQLList(FIELD_TYPE)
    }
  }),
  interfaces: [NODE_TYPE]
})

module.exports = {
  DEFINITION_TYPE,
  DEFINITION_STATE_TYPE,
  FIELD_TYPE_TYPE,
  FIELD_STATE_TYPE
}