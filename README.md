# graphql-firepad-text-operation [![Build Status](https://travis-ci.org/tjmehta/graphql-firepad-text-operation.svg?branch=master)](https://travis-ci.org/tjmehta/graphql-firepad-text-operation)
GraphQL firepad text operation json type

# Installation
```bash
npm i --save graphql-firepad-text-operation
```

# Usage
```js
var GraphQLTextOperation = require('graphql-firepad-text-operation')

// Use graphql-date in your GraphQL objects for Date properties
var fooType = new GraphQLObjectType({
  name: 'Foo',
  fields: {
    created: {
      type: GraphQLTextOperation,
      description: 'Firepad text operation json',
    }
  }
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    foo: {
      type: fooType,
      resolve: function () {
        // ...
      },
    }
  }
})
```

# License
MIT
