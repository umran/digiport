const express = require('express')
const graphqlHTTP = require('express-graphql')
const generateSchema = require('../../src/generateSchema')
const { printSchema } = require('graphql')

// declare placeholder schemas
const schemas = [
  {
    name: "product",
    fields: [
      {
        name: "name",
        type: "string",
      },
      {
        name: "categories",
        type: "array",
        item: {
          name: "categories",
          type: "reference",
          reference: "categories"
        }
      }
    ]
  },
  {
    name: "categories",
    fields: [
      {
        name: "name",
        type: "string"
      }
    ]
  }
]

// declare a placeholder resolver
const resolver = async ({ source, args, context, info, collection }) => {
  return {
    page_info: null,
    edges: []
  }
}

const gqlSchema = generateSchema(schemas, resolver)
// console.log(printSchema(gqlSchema))

const app = express()
app.use('/', graphqlHTTP({
  schema: gqlSchema,
  graphiql: true
}))

app.listen(3256)