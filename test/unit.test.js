var describe = global.describe
var it = global.it

var expect = require('chai').expect
var Kind = require('graphql/language').Kind

var GraphQLTextOperation = require('../index.js')

describe('GraphQLDate', function () {
  beforeEach(function () {
    this.op = [1, 'hey', 1]
  })
  describe('serialize', function () {
    it('should validate and return', function () {
      var op = this.op
      expect(
        GraphQLTextOperation.serialize(op)
      ).to.equal(op)
    })

    it('should toJSON, validate and return', function () {
      var op = this.op
      var obj = {
        toJSON: function () {
          return op
        }
      }
      expect(
        GraphQLTextOperation.serialize(obj)
      ).to.equal(op)
    })
  })

  describe('parseValue', function () {
    it('should return the same value', function () {
      var op = this.op
      expect(
        GraphQLTextOperation.parseValue(op)
      ).to.equal(op)
    })
  })

  describe('parseLiteral', function () {
    it('should parse ast to op', function () {
      var ast = {
        kind: Kind.LIST,
        values: [{
          kind: Kind.INT,
          value: 1
        }, {
          kind: Kind.STRING,
          value: 'hey'
        }, {
          kind: Kind.INT,
          value: 1
        }]
      }
      var op = this.op
      expect(
        GraphQLTextOperation.parseLiteral(ast)
      ).to.deep.equal(op)
    })

    it('should error if root is not a list', function () {
      var ast = {
        kind: Kind.INT,
        value: 1
      }
      expect(
        GraphQLTextOperation.parseLiteral.bind(GraphQLTextOperation, ast)
      ).to.throw(/list/)
    })

    it('should error if list item is not an int or string', function () {
      var ast = {
        kind: Kind.LIST,
        values: [{
          kind: Kind.INT,
          value: 1
        }, {
          kind: Kind.STRING,
          value: 'hey'
        }, {
          kind: Kind.FLOAT,
          value: 1.1
        }]
      }
      expect(
        GraphQLTextOperation.parseLiteral.bind(GraphQLTextOperation, ast)
      ).to.throw(/int.*string/)
    })
  })
})
