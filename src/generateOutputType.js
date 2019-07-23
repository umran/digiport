const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLBoolean } = require('graphql')
const { GraphQLDateTime } = require('graphql-iso-date')
const NODE_TYPE = require('./nodeType')

// declare static fields that will be used in every schema
const STATIC_COLLECTION_FIELDS = {
  id: {
    type: new GraphQLNonNull(GraphQLID)
  }
}

const generateOutputType = (schema, outputTypes, predicateTypes, orderByTypes, connectionTypes, resolver, path=null) => {
  path = path || schema.name

  return new GraphQLObjectType({
    name: path,
    // fields is a function because
    // it might contain references to schemas
    // that haven't been generated yet
    fields: () => schema.fields.reduce((fieldMap, field) => {
      fieldMap[field.name] = generateField(field, outputTypes, predicateTypes, orderByTypes, connectionTypes, resolver, path)
      return fieldMap
    }, {
      ...(path === schema.name ? STATIC_COLLECTION_FIELDS : {})
    }),
    interfaces: path === schema.name ? [NODE_TYPE] : null
  })
}

/****
the generateField function converts a field
into the appropriate graphql field object
****/
const generateField = (field, outputTypes, predicateTypes, orderByTypes, connectionTypes, resolver, parent, inArray=false) => {
  const path = `${parent}_${field.name}`
  let type
  let args
  let resolve

  switch (field.type) {
    // if the field is a reference to another schema,
    // then use the referenced schema's gql output type
    // or connection type, if in an array, as the field type
    case "reference":
      type = inArray ? connectionTypes[field.reference] : outputTypes[field.reference]
      
      if (inArray) {
        args = {
          where: {
            type: predicateTypes[field.reference]
          },
          order_by: {
            type: orderByTypes[field.reference]
          },
          limit: {
            type: GraphQLInt
          },
          cursor: {
            type: GraphQLString
          }
        }

        resolve = async (root, args, context) => await resolver({
          root,
          args,
          context,
          collection: field.reference
        })
      }
      break

    // if the field is an object type, then generate a new
    // gql output type and set it as the field type
    case "object":
      outputTypes[path] = generateOutputType(field, outputTypes, predicateTypes, orderByTypes, connectionTypes, resolver, path)
      type = outputTypes[path]
      break

    // if the field is an array, then recursively generate
    // the field for the array item
    case "array":
      const itemField = generateField(field.item, outputTypes, predicateTypes, orderByTypes, connectionTypes, resolver, `${parent}_${field.name}`, true)

      type = (field.item.type === "reference" || field.item.type === "array") ? itemField.type : new GraphQLList(itemField.type)
      args = itemField.args
      resolve = itemField.resolve
      break

    case "string":
      type = GraphQLString
      break

    case "integer":
      type = GraphQLInt
      break

    case "float":
      type = GraphQLFloat
      break

    case "boolean":
      type = GraphQLBoolean
      break

    case "date":
      type = GraphQLDateTime
      break
  }

  return {
    type,
    args,
    resolve
  }
}

module.exports = generateOutputType