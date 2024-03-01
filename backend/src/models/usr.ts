import { FastifyInstance } from "fastify";

interface User {
    id: string,
    name: string,
    email: string
};

const validateEmailPassword = async (fastify: FastifyInstance, email: string, password: string): Promise<User | null> => {
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
            name: rows[0].name,
            email: email
        }
    }
    return null;
}
export { validateEmailPassword }