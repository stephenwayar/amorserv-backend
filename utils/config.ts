import dotenv from 'dotenv';
dotenv.config();

const SECRET: string | undefined = process.env.SECRET;

const PORT: string | undefined = process.env.PORT;

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

export { MONGODB_URI, PORT, SECRET };