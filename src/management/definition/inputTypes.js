const { GraphQLInputObjectType, GraphQLString, GraphQLBoolean, GraphQLNonNull, GraphQLList } = require('graphql')
const { FIELD_TYPE_TYPE, FIELD_STATE_TYPE } = require('./outputTypes')

const FIELD_OPTIONS_INPUT_TYPE = new GraphQLInputObjectType({
  name: '_field_options_input',
  fields: () => ({
    required: {
      type: GraphQLBoolean
    }
  })
})

const FIELD_ITEM_INPUT_TYPE = new GraphQLInputObjectType({
  name: '_field_item_input',
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
      type: new GraphQLList(new GraphQLNonNull(FIELD_INPUT_TYPE))
    }
  })
})

const FIELD_INPUT_TYPE = new GraphQLInputObjectType({
  name: '_field_input',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    type: {
      type: FIELD_TYPE_TYPE
    },
    reference: {
      type: GraphQLString
    },
    item: {
      type: FIELD_ITEM_INPUT_TYPE
    },
    fields: {
      type: new GraphQLList(new GraphQLNonNull(FIELD_INPUT_TYPE))
    },
    options: {
      type: FIELD_OPTIONS_INPUT_TYPE
    },
    state: {
      type: FIELD_STATE_TYPE
    }
  })
})

module.exports = {
  FIELD_INPUT_TYPE
}