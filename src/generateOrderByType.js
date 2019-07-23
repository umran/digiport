const { GraphQLInputObjectType, GraphQLEnumType } = require('graphql')

const SORT_ORDER_TYPE = new GraphQLEnumType({
  name: '_sort_order',
  values: {
    asc: { value: 1 },
    desc: { value: -1 }
  }
})

const STATIC_COLLECTION_FIELDS = {
  id: {
    type: SORT_ORDER_TYPE
  }
}

const generateOrderByType = (schema, orderByTypes, path=null) => {
  path = path || schema.name

  return new GraphQLInputObjectType({
    name: `${path}_order_by`,
    fields: () => schema.fields.reduce((fieldMap, field) => {
      // we can't order by an array so we exclude array fields
      if (field.type !== "array") {
        fieldMap[field.name] = generateField(field, orderByTypes, path)
      } 
      return fieldMap
    }, {
      ...(path === schema.name ? STATIC_COLLECTION_FIELDS : {})
    })
  })
}

const generateField = (field, orderByTypes, parent) => {
  const path = `${parent}_${field.name}`
  let type

  switch (field.type) {
    case "reference":
      type = orderByTypes[field.reference]
      break
    
    case "object":
      orderByTypes[path] = generateOrderByType(field, orderByTypes, path)
      type = orderByTypes[path]
      break

    case "string":
      type = SORT_ORDER_TYPE
      break

    case "integer":
      type = SORT_ORDER_TYPE
      break

    case "float":
      type = SORT_ORDER_TYPE
      break

    case "boolean":
      type = SORT_ORDER_TYPE
      break

    case "date":
      type = SORT_ORDER_TYPE
      break
  }

  return { type }
}

module.exports = generateOrderByType