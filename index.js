
   
const { ApolloServer, gql } = require("apollo-server");
const { ByteTypeDefinition, ByteResolver } = require('graphql-scalars');
const fs = require('fs');


// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  ${ByteTypeDefinition}

  type Query {
    test: [Byte!]!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Byte: ByteResolver,
  Query: {
    test: (root, args, context) => {
      const fileData = fs.readFileSync("dummy.pdf").toString('hex');
      let result = []
      for (var i = 0; i < fileData.length; i+=2)
        result.push('0x'+fileData[i]+''+fileData[i+1])
      return result;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});