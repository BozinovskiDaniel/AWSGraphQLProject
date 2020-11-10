const graphql = require('graphql');
var _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
} = graphql;

// Dummy Data
var usersData = [
    {id: '1', age: 31, name: 'Daniel', profession: "Software Engineer"},
    {id: '20', age: 21, name: 'James', profession: "Electrician"},
    {id: '123', age: 67, name: 'Andrew', profession: "Plumber"},
    {id: '34', age: 52, name: 'Peter', profession: "Mechanic"},
    {id: '51', age: 45, name: 'Paul', profession: "Structural Engineer"},
];

var hobbiesData = [
    {id: '1', title: 'Programming', description: 'Programming to make the world a better place'},
    {id: '2', title: 'Rowing', description: 'Swimming our shoulders up and down to paddle'},
    {id: '3', title: 'Swimming', description: 'Trying not to drown'},
    {id: '4', title: 'Fencing', description: 'Slapping other people with swords'},
    {id: '5', title: 'Hiking', description: 'Walking around in scenic locations'},
];

var postsData = [
    {id: '1', comment: 'Hello, Im from under the mountain', userId: '1'}, 
    {id: '2', comment: 'This is a really cool second post', userId: '51'}, 
    {id: '3', comment: 'Rick and Morty is Lit', userId: '1'}, 
];

// Create Types
const userType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for User...',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString}
    })
});

// Hobby Type
const hobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobby Description',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString}
    })
});

// Post Type (id, comment)
// Link post to user
const postType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post Description',
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        // Relation to user
        user: {
            type: userType,
            resolve(parent, args) {
                return _.find(usersData, {id: parent.userId})
            }
        }
    })
})


// Root Query
const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        user: {
            type: userType,
            args: {id: {type: GraphQLID}}, // Get user by id
            resolve(parent, args) {
                // Where we resolve with data
                // Get/Return Data from a Data Source
                return _.find(usersData, {id: args.id});
            }
        },

        hobby: {
            type: hobbyType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // Return data for our hobby
                return _.find(hobbiesData, {id: args.id});
            }
        },

        post: {
            type: postType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // Return post data
                return _.find(postsData, {id: args.id})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: rootQuery
});