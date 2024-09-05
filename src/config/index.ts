import dotenv from 'dotenv'
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  client_url:process.env.CLIENT_URL,
  server_url:process.env.SERVER_URL,

}