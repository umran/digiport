const { GraphQLObjectType, GraphQLList, GraphQLString  } = require('graphql')

const generateResultType = type => new GraphQLObjectType({
  name: `result_${type.toString()}`,
  fields: () => ({
    results: {
      type: new GraphQLList(type)
    },
    cursor: {
      type: GraphQLString
    }
  })
})

module.exports = generateResultType