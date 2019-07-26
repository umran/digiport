const { GraphQLSchema } = require('graphql')
const generateMutation = require('./generateMutation')
const generateQuery = require('./generateQuery')

const generateSchema = resolver => {
  return new GraphQLSchema({
    mutation: generateMutation(resolver),
    query: generateQuery(resolver)
  })
}

module.exports = generateSchema