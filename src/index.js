import LeninardoClient from './client/Leninardo'
import dotenv from 'dotenv'

dotenv.config()
const ownerID = process.env.ownerID
const token = process.env.TOKEN

const client = new LeninardoClient(ownerID, token)

client.start()