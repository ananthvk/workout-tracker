import { FastifyInstance } from "fastify"
import { build } from "../../../helper.js"
import t from "tap"

t.test("check creation of a user", async (t) => {
    const app: FastifyInstance = await build(t)
    app.pg.query('DELETE FROM Usr;')

    const res = await app.inject({
        url: "/api/v1/users",
        method: "POST",
        payload: {
            "email": "123@example.com",
            "password": "password"
        }
    })

    t.equal(res.statusCode, 200)
    t.same(res.json().email, "123@example.com")
})

t.test("reject creation of users when fields are missing or incorrect", async (t) => {
    const app: FastifyInstance = await build(t)
    app.pg.query('DELETE FROM Usr;')

    const payloads: any = [
        { "password": "sdftestpassword" },
        { "email": "email@email.com" },
        { "email": 3.1415, "password": "Validpassword" },
        { "email": 5221, "password": 91321 }
    ]

    for (const payload of payloads) {
        const res = await app.inject({
            url: "/api/v1/users",
            method: "POST",
            payload: payload
        })
        t.equal(res.statusCode, 400)
        t.equal(res.json().error, "Bad Request")
    }
})