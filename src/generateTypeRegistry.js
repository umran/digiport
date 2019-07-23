const generateOutputType = require('./generateOutputType')
const generatePredicateType = require('./generatePredicateType')
const generateOrderByType = require('./generateOrderByType')
const generateResultType = require('./generateResultType')
const generateConnectionType = require('./generateConnectionType')

const INITIAL_REGISTRY = {
  outputTypes: {},
  predicateTypes: {},
  orderByTypes: {},
  connectionTypes: {}
}

const generateTypeRegistry = schemas => {
  return schemas.reduce((registry, schema) => {
    let { outputTypes, predicateTypes, orderByTypes, connectionTypes } = registry

    orderByTypes[schema.name] = generateOrderByType(schema, orderByTypes)
    predicateTypes[schema.name] = generatePredicateType(schema, predicateTypes)
    outputTypes[schema.name] = generateOutputType(schema, outputTypes, predicateTypes, orderByTypes, connectionTypes)
    connectionTypes[schema.name] = generateConnectionType(outputTypes[schema.name])

    return registry
  }, { ...INITIAL_REGISTRY })
}

module.exports = generateTypeRegistry