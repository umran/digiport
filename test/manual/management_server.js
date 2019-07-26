const express = require('express')
const graphqlHTTP = require('express-graphql')
const { generateSchema } = require('../../src/management')

// declare a placeholder resolver
const resolver = async ({ source, args, context, info, method }) => {
  return {
    status: "OK",
    message: "this is just a placeholder"
  }
}

const gqlSchema = generateSchema(resolver)

const app = express()
app.use('/', graphqlHTTP({
  schema: gqlSchema,
  graphiql: true
}))

app.listen(3128)