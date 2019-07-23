const { GraphQLInputObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLBoolean } = require('graphql')
const { GraphQLDateTime } = require('graphql-iso-date')

// define all operators
const ID_OPERATORS_TYPE = new GraphQLInputObjectType({
  name: "_id_operators",
  fields: {
    _eq: {
      type: GraphQLID
    }
  }
})

const STRING_OPERATORS_TYPE = new GraphQLInputObjectType({
  name: "_string_operators",
  fields: {
    _eq: {
      type: GraphQLString
    }
  }
})

const INTEGER_OPERATORS_TYPE = new GraphQLInputObjectType({
  name: "_integer_operators",
  fields: {
    _eq: {
      type: GraphQLInt
    }
  }
})

const FLOAT_OPERATORS_TYPE = new GraphQLInputObjectType({
  name: "_float_operators",
  fields: {
    _eq: {
      type: GraphQLFloat
    }
  }
})

const BOOLEAN_OPERATORS_TYPE = new GraphQLInputObjectType({
  name: "_boolean_operators",
  fields: {
    _eq: {
      type: GraphQLBoolean
    }
  }
})

const DATE_OPERATORS_TYPE = new GraphQLInputObjectType({
  name: "_date_operators",
  fields: {
    _eq: {
      type: GraphQLDateTime
    }
  }
})

module.exports = {
  ID_OPERATORS_TYPE,
  STRING_OPERATORS_TYPE,
  INTEGER_OPERATORS_TYPE,
  FLOAT_OPERATORS_TYPE,
  BOOLEAN_OPERATORS_TYPE,
  DATE_OPERATORS_TYPE
}