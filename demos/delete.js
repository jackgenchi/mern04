import { MongoClient, ObjectId } from "mongodb";
import {} from 'dotenv/config'

const uri = process.env.DB 
const client = new MongoClient(uri)
// deleting by unique identifier. 
let objid = new ObjectId('680c0d12c2b840f140832519')

async function deleteUser() {
    try{
        await client.connect(uri)
        console.log("delete functioned connected to db")
        let database = client.db('vectacorp')
        let query = {_id: objid}
        await database
            .collection('employees')
            .deleteOne(query)
        console.log("1 Document deleted")
    }catch(err){
        console.log(err)
    }finally{
        await client.close()
    }
}
deleteUser()