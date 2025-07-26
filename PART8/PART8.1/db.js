

// do npm i mongodb -> to get mongodb pacakage/module used for connection

// import/require MongoClient used to connect to and interact with a MongoDB database. MongoClient is a class provided by the MongoDB Node.js driver

const {MongoClient} = require('mongodb')

// Connection URL

const URL = "mongodb+srv://akshitpjt07:akiCap@cluster0.zwuzzvp.mongodb.net/"  // connection string (also called a URI) for MongoDB.

const client = new MongoClient(URL)  // creating a new MongoDB client instance using the connection string.
/*
client = your app’s interface to the MongoDB database.
client object is what you'll use to:

Connect to MongoDB (client.connect())

Access databases (client.db('databaseName'))

Perform queries and CRUD operations
 */

// Database Name (as cluster can have multiple)
const dbName = 'LearningNodeJs';

async function main () {
    // connect to the Server
    await client.connect()        // client.connect() returns a Promise — it’s asynchronous. // This tells the MongoDB client to connect to the MongoDB server at the URL you gave earlier. // await pauses the function until the connection is complete.
        console.log("Connected to the server")
    const db = client.db(dbName) // accesses a specific database from your MongoDB server using the connected client
    // console.log(db)

    // selecting the collection
    const collection = db.collection('DB')

    


    // do operation ----

    return 'done'; // If you return a value from an async function, it becomes the resolved value of the returned Promise.
}

main()
    .then(console.log) // .then(result => console.log(result))
    .catch(console.error)
    .finally(() => client.close())    /* Imagine your function throws an error before client.close() is called — without .finally, you'd leave the MongoDB connection open, which is a bad practice. */
