import express from 'express';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import dotenv from 'dotenv';
import { Pool } from 'pg';

const app = express();
const port = 5000;

app.get('/get_data_for_trainig',async(
    try{
        const query = `SELECT
        store_id,`
    }
))