import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
const { Pool } = pg;
import session from "express-session";
import pgSession from "connect-pg-simple";

// Create a connection pool instead of a single client
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "Beechem@31426",
  database: process.env.DB_NAME || "postgres",
  max: 10, // Max connections in pool
  idleTimeoutMillis: 30000, // Close idle connections after 30s
  connectionTimeoutMillis: 2000, // Timeout if connection takes > 2s
});

// Use the pool with Drizzle ORM
export const db = drizzle(pool);

// Configure session store with the pool
const PgSessionStore = pgSession(session);
export const sessionStore = new PgSessionStore({
  createTableIfMissing: true,
  pool, // Use connection pool instead of a single client
  tableName: "session", // Ensure this table exists in your database
});
