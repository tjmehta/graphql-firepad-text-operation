var assertErr = require('assert-err')
var GraphQLScalarType = require('graphql').GraphQLScalarType
var GraphQLError = require('graphql/error').GraphQLError
var Kind = require('graphql/language').Kind
var validateTextOperation = require('validate-firepad-text-operation')

module.exports = new GraphQLScalarType({
  name: 'TextOperation',
  /**
   * Serialize text-operation into json and validate
   * @param  {Object} op
   * @return {Object} op validated
   */
  serialize: function (op) {
    op = op.toJSON
      ? op.toJSON()
      : op
    validateTextOperation(op)
    return op
  },
  /**
   * Parse text-operation just returns the json value as-is
   * @param  {Object} op
   * @return {Object} op
   */
  parseValue: function (op) {
    return op
  },
  /**
   * Parse ast literal to to text-operation json
   * @param  {Object} ast graphql ast
   * @return {Object} op
   */
  parseLiteral: function (ast) {
    assertErr(ast.kind === Kind.LIST,
      GraphQLError, 'Query error: Can only parse lists (arrays) to text-operations but got a: ' + ast.kind, [ast])
    var op = ast.values.map(function (itemAst) {
      if (itemAst.kind === Kind.INT) {
        return parseInt(itemAst.value)
      } else if (itemAst.kind === Kind.STRING) {
        return itemAst.value
      } else {
        throw new GraphQLError('Query error: Can only parse ints and strings to text-operation items but got a: ' + itemAst.kind, [ast])
      }
    })
    return op
  }
})
