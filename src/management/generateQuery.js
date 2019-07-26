const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql')
const generateDefinition = require('./definition/generateQueries')
const generateBucket = require('./bucket/generateQueries')

const generateQuery = resolver => new GraphQLObjectType({
  name: '_query',
  fields: {
    ...generateDefinition(resolver),
    ...generateBucket(resolver)
  }
})

module.exports = generateQuery