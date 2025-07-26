const {MongoClient} = require('mongodb')

const URL = "mongodb+srv://akshitpjt07:akiCap@cluster0.zwuzzvp.mongodb.net/"

const client = new MongoClient(URL)

const dbName = "LearningNodeJs"

async function main() {
    
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(dbName)

    const collection = db.collection('DB')

    // operations

    // Insert
    const data = {
        first_name: 'aki',
        last_name: 'don'
    }

    const InsertData = await collection.insertOne(data)
    console.log("Insert this data : " , InsertData)

    // Update
    const updateData = await collection.updateOne({first_name : "Aki"}, {$set : { first_name : "Chin" } });
    console.log("Updated Data : ", updateData)

    // Read
    const findResult = await collection.find({}).toArray()
    console.log("Result : " , findResult)

    // count document number
    const countDocument = await collection.estimatedDocumentCount()
    console.log("Count = " , countDocument)

    // find firstname = chin
    const ans = await collection.find({first_name : "Chin"}).toArray()
    console.log("ANS : " , ans)

    return 'done'

}

main()
    .then(console.log)
    .catch(console.catch)
    .finally(() => client.close())

/*
estimatedDocumentCount()	You want a fast count of all documents (approximate, uses metadata) 
                            estimatedDocumentCount() does not take any arguments (no {})
countDocuments(query)	You want a filtered, accurate count

✅ estimatedDocumentCount() → No filter, fast, uses collection stats.

✅ countDocuments(filter) → Slower but accurate, supports queries.
*/

/*
find(filter, options?)
 filter → What documents you want (like { age: { $gt: 18 } })
 options helps you control how results are returned: how many, which fields, sorted how, etc. [It's not about what to get — it’s about how to get it. :) ]
    ex : Get first 5 users sorted by age
        collection.find({}, { sort: { age: 1 }, limit: 5 })
*/