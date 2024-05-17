import { FastifyInstance } from "fastify"

interface User {
    id: string,
    email: string
}

class StatusError extends Error {
    statusCode: number | undefined
}


// This function returns the user specified by the ID
const getUserById = async (fastify: FastifyInstance, id: string): Promise<User> => {
    const { rows, rowCount } = await fastify.pg.query(
        'SELECT id, email FROM Usr WHERE id=$1;',
        [id]
    )
    if (rowCount == 0) {
        // The user was not found
        let err = new StatusError('User not found')
        err.statusCode = 404;
        throw err;
    }
    return {
        id: rows[0].id,
        email: rows[0].email
    }
}

// This functions adds an user to the database
const createUser = async (fastify: FastifyInstance, email: string, password: string): Promise<User> => {
    try {
        const { rows } = await fastify.pg.query(
            'INSERT INTO Usr (email, password) VALUES ($1, $2) RETURNING id',
            [email, await fastify.hash(password)]
        )
        return {
            id: rows[0].id,
            email: email
        }
    }
    catch (err: any) {
        let e = new StatusError()
        e.statusCode = 400;
        if (err.code == "23505") {
            e.message = "Email has already been registered"
        }
        else {
            e.message = "Error while creating user"
        }
        throw e;
    }

}

// Verifies if the email and password are correct
const verifyUser = async (fastify: FastifyInstance, email: string, password: string): Promise<User> => {
    const { rows, rowCount } = await fastify.pg.query("SELECT id, password FROM Usr WHERE email=$1;", [email])
    if (rowCount == 0 || !(await fastify.check(password, rows[0].password))) {
        let err = new StatusError("Invalid email/password")
        err.statusCode = 401;
        throw err;
    }
    return {
        id: rows[0].id,
        email: email
    }
}


export { getUserById, createUser, verifyUser }