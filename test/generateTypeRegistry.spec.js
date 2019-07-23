const expect = require('chai').expect
const generateTypeRegistry = require('../src/generateTypeRegistry')
const { GraphQLSchema, GraphQLObjectType, GraphQLInputObjectType, GraphQLInt, GraphQLString } = require('graphql')

const schemas = [
  {
    name: "person",
    fields: [
      {
        name: "name",
        type: "string"
      },
      {
        name: "age",
        type: "integer"
      },
      {
        name: "date_of_birth",
        type: "date"
      },
      {
        name: "employed",
        type: "boolean"
      },
      {
        name: "net_worth",
        type: "float"
      },
      {
        name: "contact",
        type: "object",
        fields: [
          {
            name: "email",
            type: "string"
          },
          {
            name: "phone",
            type: "string"
          }
        ]
      },
      {
        name: "spouse",
        type: "reference",
        reference: "person"
      },
      {
        name: "children",
        type: "array",
        item: {
          name: "child",
          type: "reference",
          reference: "person"
        }
      },
      {
        name: "address",
        type: "reference",
        reference: "address"
      },
      {
        name: "preferred_cipher_suites",
        type: "array",
        item: {
          name: "cipher_suites",
          type: "reference",
          reference: "cipher_suite"
        }
      }
    ]
  },
  {
    name: "address",
    fields: [
      {
        name: "line_1",
        type: "string"
      },
      {
        name: "line_2",
        type: "string"
      },
      {
        name: "city",
        type: "string"
      },
      {
        name: "postal_code",
        type: "string"
      },
      {
        name: "province",
        type: "string"
      },
      {
        name: "country",
        type: "string"
      }
    ]
  },
  {
    name: "cipher_suite",
    fields: [
      {
        name: "algorithms",
        type: "array",
        item: {
          name: "algorithm",
          type: "object",
          fields: [
            {
              name: "name",
              type: "string"
            },
            {
              name: "cipher",
              type: "string"
            },
            {
              name: "hash_function",
              type: "string"
            },
            {
              name: "key_exchange",
              type: "string"
            }
          ]
        }
      },
      {
        name: "authors",
        type: "array",
        item: {
          name: "author_groups",
          type: "array",
          item: {
            name: "author",
            type: "reference",
            reference: "person"
          }
        }
      },
      {
        name: "contacts",
        type: "array",
        item: {
          name: "contact",
          type: "object",
          fields: [
            {
              name: "email",
              type: "string"
            },
            {
              name: "phone",
              type: "string"
            }
          ]
        }
      }
    ]
  }
]

// declare a placeholder resolver
const resolver = async ({ root, args, context, collection }) => {
  return []
}

describe('generateTypeRegistry()', () => {
  it('should generate valid output, predicate and order by types for all schemas', () => {
    const { outputTypes, predicateTypes, orderByTypes, connectionTypes } = generateTypeRegistry(schemas)

    schemas.forEach(schema => {
      expect(outputTypes[schema.name]).to.be.instanceOf(GraphQLObjectType)
      expect(predicateTypes[schema.name]).to.be.instanceOf(GraphQLInputObjectType)
      expect(orderByTypes[schema.name]).to.be.instanceOf(GraphQLInputObjectType)
      expect(connectionTypes[schema.name]).to.be.instanceOf(GraphQLObjectType)
    })
  })

  it('should allow a graphQL schema to be compiled using all of the types generated', () => {
    const { outputTypes, predicateTypes, orderByTypes, connectionTypes } = generateTypeRegistry(schemas)

    // generate a graphql schema using the generated types to test thier validity
    const test = () => {
      const query = new GraphQLObjectType({
        name: "query",
        fields: schemas.reduce((fieldMap, schema) => {
          fieldMap[schema.name] = {
            type: connectionTypes[schema.name],
            resolve: async (root, args, context) => {
              return await resolver({
                root,
                args,
                context,
                collection: schema.name
              })
            },
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
            }
          }

          return fieldMap
        }, {})
      })

      const gqlSchema = new GraphQLSchema({
        query
      })
    }

    expect(test).to.not.throw()
  })
})