import { MongoClient } from "mongodb";
import {} from 'dotenv/config'

const uri = process.env.DB
const client = new MongoClient(uri)

//FIND RANDOM
// async function retrieveOne() {
//     try{
//         await client.connect(uri)
//         console.log("connected to db")
//         let database = client.db('vectacorp')
//         let result = await database
//             .collection('employees')
//             .findOne({})
//         console.log(result)
//     }catch(err){
//         console.log(err)
//     }finally {
//         await client.close()
//     }
// }

//FIND USING QUERY
async function retrieveOne() {
    try{
        await client.connect(uri)
        console.log("connected to db")
        let database = client.db('vectacorp')
        let query = {title: 'CEO'}
        let result = await database
            .collection('employees')
            .find(query)
            .toArray()
        console.log(result)
    }catch(err){
        console.log(err)
    }finally {
        await client.close()
    }
}

retrieveOne()