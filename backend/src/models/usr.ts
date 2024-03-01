import { FastifyInstance } from "fastify";

interface UserId {
    id: string,
};

interface User {
    id: string,
    name: string,
    email: string
};

const validateEmailPassword = async (fastify: FastifyInstance, email: string, password: string): Promise<UserId | null> => {
    const { rows, rowCount } = await fastify.pg.query(
        'SELECT id, name, password FROM usr WHERE email=$1;',
        [email]
    )
    // User not found
    if (rowCount == 0) {
        return null;
    }
    const match = await fastify.check(password, rows[0].password);
    if (match) {
        return {
            id: rows[0].id,
        }
    }
    return null;
}

const getUserById = async (fastify: FastifyInstance, id: string): Promise<User | null> => {
    const { rows, rowCount } = await fastify.pg.query(
        'SELECT id, name, email FROM usr WHERE id=$1;',
        [id]
    )
    // User not found
    if (rowCount == 0) {
        return null;
    }
    return {
        id: rows[0].id,
        name: rows[0].name,
        email: rows[0].email
    }
}
export { validateEmailPassword, getUserById}