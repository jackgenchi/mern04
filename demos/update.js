import { MongoClient } from "mongodb"
import {} from 'dotenv/config'

const uri = process.env.DB
const client =  new MongoClient(uri)

async function updateOne(){
    try{
        await client.connect(uri)
        console.log("upadate has connected to database")
        let database = client.db('vectacorp')
        let query = {name: 'Joe Brooke'}
        let queryUpdate = {$set:{name:'Zak Ruvalcaba',email:'zak@vectacorp.com'}}
        await database
            .collection('employees')
            .updateOne(query,queryUpdate, (err,res)=>{
                if (err) throw err
                console.log('1 document updated')
            })
    
    
    }catch(err){
        console.log(err)
    }finally{
        await client.close()
    }
}

updateOne()
