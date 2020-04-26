import LeninardoClient from './client/Leninardo'
import { Player } from 'discord-player'
import dotenv from 'dotenv'

dotenv.config()
const ownerID = process.env.ownerID
const token = process.env.TOKEN
const youtube = process.env.youtube

const client = new LeninardoClient(ownerID, token)

export const player = new Player(client, youtube)

client.start()