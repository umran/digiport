const { GraphQLSchema } = require('graphql')
const generateQuery = require('./generateQuery')

const generateSchema = (schemas, resolver) => {
  const query = generateQuery(schemas, resolver)
  
  return new GraphQLSchema({
    query
  })
}

module.exports = generateSchema