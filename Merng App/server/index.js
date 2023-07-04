const express = require('express');
require('dotenv').config();
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema.js');
const colors = require('colors');
const cors = require('cors');

const connectDB = require('./config/DB.js');

const PORT = process.env.PORT || 8000;

const app = express();
connectDB();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}));

app.listen(PORT, () => {
  console.log(`Server ${PORT}. listening on}`.blue.bold);
});