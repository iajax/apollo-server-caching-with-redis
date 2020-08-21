const { ApolloServer, gql } = require('apollo-server');
const { RedisCache } = require('apollo-server-cache-redis');

require('dotenv').config();

const MovieAPI = require('./MovieAPI')

const typeDefs = gql`
    type Movie {
        title: String!
        overview: String
    }

    type Query {
        popularMovies(page: Int): [Movie!]!
    }
`;

const resolvers = {
    Query: {
        popularMovies: (_, { page }, { dataSources }) => dataSources.movieAPI.getPopularMovies(page),
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: new RedisCache(process.env.REDIS_URL),
    dataSources: () => ({
        movieAPI: new MovieAPI()
    })
});

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});