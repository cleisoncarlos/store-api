//import mongodb from 'mongodb'
import { MongoClient } from 'mongodb';
import 'dotenv/config'

function getClient(){ 
    const uri = process.env.MONGO_URI
    return new MongoClient(uri)
}

export  {getClient}

