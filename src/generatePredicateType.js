const { GraphQLInputObjectType, GraphQLList } = require('graphql')
const { ID_OPERATORS_TYPE, STRING_OPERATORS_TYPE, INTEGER_OPERATORS_TYPE, FLOAT_OPERATORS_TYPE, BOOLEAN_OPERATORS_TYPE, DATE_OPERATORS_TYPE } = require('./operatorsTypes')

const STATIC_COLLECTION_FIELDS = {
  id: {
    type: ID_OPERATORS_TYPE
  }
}

const generatePredicateType = (schema, predicateTypes, path=null) => {
  path = path || schema.name

  return new GraphQLInputObjectType({
    name: `${path}_predicate`,
    fields: () => schema.fields.reduce((fieldMap, field) => {
      fieldMap[field.name] = generateField(field, predicateTypes, path)
      return fieldMap
    }, {
      _and: {
        type: new GraphQLList(predicateTypes[path])
      },
      _or: {
        type: new GraphQLList(predicateTypes[path])
      },
      _not: {
        type: predicateTypes[path]
      },
      ...(path === schema.name ? STATIC_COLLECTION_FIELDS : {})
    })
  })
}

const generatePredicateArrayType = (itemType, predicateTypes, path) => new GraphQLInputObjectType({
  name: `${path}_predicate`,
  fields: () => ({
    _contains_all_of: {
      type: new GraphQLList(itemType)
    },
    _contains_any_of: {
      type: new GraphQLList(itemType)
    },
    _and: {
      type: predicateTypes[path]
    },
    _or: {
      type: predicateTypes[path]
    },
    _not: {
      type: predicateTypes[path]
    }
  })
})

const generateField = (field, predicateTypes, parent) => {
  const path = `${parent}_${field.name}`
  let type

  switch (field.type) {
    case "reference":
      type = predicateTypes[field.reference]
      break

    case "object":
      predicateTypes[path] = generatePredicateType(field, predicateTypes, path)
      type = predicateTypes[path]
      break

    case "array":
      const itemField = generateField(field.item, predicateTypes, path)
      if (field.item.type === "array") {
        type = itemField.type
      } else {
        predicateTypes[path] = generatePredicateArrayType(itemField.type, predicateTypes, path)
        type = predicateTypes[path]
      }
      break

    case "string":
      type = STRING_OPERATORS_TYPE
      break

    case "integer":
      type = INTEGER_OPERATORS_TYPE
      break

    case "float":
      type = FLOAT_OPERATORS_TYPE
      break

    case "boolean":
      type = BOOLEAN_OPERATORS_TYPE
      break

    case "date":
      type = DATE_OPERATORS_TYPE
      break
  }

  return { type }
}

module.exports = generatePredicateType