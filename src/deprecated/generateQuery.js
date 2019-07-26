const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')
const generateTypeRegistry = require('./generateTypeRegistry')

const generateQuery = (schemas, resolver) => {
  const { outputTypes, predicateTypes, orderByTypes, connectionTypes } = generateTypeRegistry(schemas)

  return new GraphQLObjectType({
    name: "query",
    fields: () => schemas.reduce((fieldMap, schema) => {
      fieldMap[schema.name] = {
        type: connectionTypes[schema.name],
        args: {
          where: {
            type: predicateTypes[schema.name]
          },
          order_by: {
            type: orderByTypes[schema.name]
          },
          limit: {
            type: GraphQLInt
          },
          cursor: {
            type: GraphQLString
          }
        },
        resolve: async (source, args, context, info) => await resolver({
          source,
          args,
          context,
          info,
          collection: schema.name
        })
      }

      return fieldMap
    }, {})
  })
}

module.exports = generateQuery