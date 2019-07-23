const express = require('express')
const graphqlHTTP = require('express-graphql')
const generateSchema = require('../../src/generateSchema')
const { printSchema } = require('graphql')

// declare placeholder schemas
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
  console.log(args)

  return {
    page_info: null,
    edges: []
  }
}

const gqlSchema = generateSchema(schemas, resolver)
console.log(printSchema(gqlSchema))

const app = express()
app.use('/', graphqlHTTP({
  schema: gqlSchema,
  graphiql: true
}))

app.listen(3256)