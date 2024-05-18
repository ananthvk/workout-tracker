/*
 * This plugin adds database connectivity using @fastify/postgres to connect to 
 * postgresql database.
 */
import fastifyPostgres from "@fastify/postgres";
import fp from "fastify-plugin"

export default fp(async (fastify) => {
    // Checks if required environment variables are set.
    // If the environment variable is not set, exit
    const env = ['CONNECTION_STRING', 'DBNAME', 'DB_CONNECTION_STRING'];
    for (let i = 0; i < env.length; i++) {
        /* c8 ignore start */
        if (!(env[i] in process.env)) {
            throw new Error(`${env[i]} environment variable not set.`)
        }
        /* c8 ignore stop */
    }

    // Registers fastify-postgres plugin by specifying the connection string
    fastify.log.info("Initializing postgres plugin...")
    await fastify.register(fastifyPostgres, {
        connectionString: process.env.CONNECTION_STRING,
        name: 'default'
    })

    // Try creating the database for this app if it does not exist
    // Run a query on pg_database to check if database with DBNAME exists
    const query = `SELECT FROM pg_database WHERE datname = '${process.env.DBNAME}';`
    let { rowCount } = await fastify.pg.default.query(query)

    if (process.env.NODE_ENV === "test" && rowCount != 0) {
        await fastify.pg.default.query(`DROP DATABASE ${process.env.DBNAME};`)
        rowCount = 0;
    }

    if (rowCount == 0) {
        await fastify.pg.default.query(`CREATE DATABASE ${process.env.DBNAME};`)
    }

    // Connect to the database for this application
    await fastify.register(fastifyPostgres, {
        connectionString: process.env.DB_CONNECTION_STRING
    })

    // Create tables if they do not exist
    fastify.pg.query('CREATE TABLE IF NOT EXISTS Usr(id BIGSERIAL PRIMARY KEY, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, is_admin BOOLEAN DEFAULT FALSE);')

    fastify.log.info("Connected to the database....")
})
