import { Pool } from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hackathon',
    password: 'Aayush@2005',
    port: 5432,
});