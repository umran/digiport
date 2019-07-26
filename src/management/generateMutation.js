const { GraphQLObjectType } = require('graphql')
const generateDefinition = require('./definition/generateMutations')
const generateBucket = require('./bucket/generateMutations')

const generateMutation = resolver => new GraphQLObjectType({
  name: '_mutation',
  fields: {
    ...generateDefinition(resolver),
    ...generateBucket(resolver)
  }
})

module.exports = generateMutation