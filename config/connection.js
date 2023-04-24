const { connect, connection } = require('mongoose');
// Allows you to connect to mongo db
//names the DB, userDB
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/userDB'

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;