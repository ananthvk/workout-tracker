import { FastifyInstance } from "fastify"
import { build } from "../../../helper.js"
import t from "tap"

t.test('user tests', async (t) => {
    let app: FastifyInstance

    t.before(async () => {
        app = await build(t, "test_user")
    })

    t.beforeEach(async (t) => {
        app.pg.query('DELETE FROM Usr;')
    })

    t.test("check creation of a user", async (t) => {
        const res = await app.inject({
            url: "/api/v1/users",
            method: "POST",
            payload: {
                "email": "123@example.com",
                "password": "password8A3"
            }
        })

        t.equal(res.statusCode, 200)
        t.same(res.json().email, "123@example.com")

        // User with duplicate email
        let res2 = await app.inject({
            url: "/api/v1/users",
            method: "POST",
            payload: {
                "email": "123@example.com",
                "password": "password8A3ss"
            }
        })
        t.equal(res2.statusCode, 400)
    })

    t.test("reject creation of users when fields are missing or incorrect", async (t) => {

        const payloads: any = [
            { "password": "sdftestpassword" },
            { "email": "email@email.com" },
            { "email": 3.1415, "password": "Validpassword3" },
            { "email": 5221, "password": 91321 },
            { "email": "", "password": "" },
            { "email": "    ", "password": "thisissomepassword44s21X" },
            { "email": "    ", "password": "     " },
            { "email": "x@x", "password": "thisissomepassword44s21A" },
            { "email": "x@xyz.com", "password": "toolongpasswordA3xixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixixix" },
            { "email": "valid@email.com", "password": "short" },
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

    t.test("check token", async (t) => {
        const res = await app.inject({
            url: "/api/v1/users",
            method: "POST",
            payload: {
                "email": "123@example.com",
                "password": "passwordxA23"
            }
        })
        t.equal(res.statusCode, 200)

        const token = await app.inject({
            url: "/api/v1/token",
            method: "POST",
            payload: {
                "email": "123@example.com",
                "password": "passwordxA23"
            }
        })
        t.equal(token.statusCode, 200)
        const decoded = app.jwt.decode(token.json().token)
        t.equal((decoded as any).id, res.json().id)

        let invalidToken = await app.inject({
            url: "/api/v1/token",
            method: "POST",
            payload: {
                "email": "123@exs.com",
                "password": "password"
            }
        })
        t.equal(invalidToken.statusCode, 401)

        invalidToken = await app.inject({
            url: "/api/v1/token",
            method: "POST",
            payload: {
                "email": "123@example.com",
                "password": "wrongpassword"
            }
        })
        t.equal(invalidToken.statusCode, 401)

        invalidToken = await app.inject({
            url: "/api/v1/token",
            method: "POST",
            payload: {
                "email": "123@example.com",
            }
        })
        t.equal(invalidToken.statusCode, 400)
    })

    t.test("test user can get their details", async (t) => {
        // First create a user
        const res = await app.inject({
            url: "/api/v1/users",
            method: "POST",
            payload: {
                "email": "123@example.com",
                "password": "password33A4"
            }
        })

        // Then get the JWT
        const token = await app.inject({
            url: "/api/v1/token",
            method: "POST",
            payload: {
                "email": "123@example.com",
                "password": "password33A4"
            }
        })

        // Get user details
        const user = await app.inject({
            url: "/api/v1/user",
            method: "GET",
            headers: {
                "authorization": `Bearer ${token.json().token}`
            }
        })
        t.equal(user.statusCode, 200)
        t.equal(user.json().id, res.json().id)
        t.equal(user.json().email, "123@example.com")
    })

    t.test("check token does not work if user is deleted", async (t) => {
        // First create a user
        const res = await app.inject({
            url: "/api/v1/users",
            method: "POST",
            payload: {
                "email": "123@example.com",
                "password": "password33A4"
            }
        })

        // Then get the JWT
        const token = await app.inject({
            url: "/api/v1/token",
            method: "POST",
            payload: {
                "email": "123@example.com",
                "password": "password33A4"
            }
        })

        // Delete the user before getting the details
        await app.pg.query('DELETE FROM Usr WHERE id=$1;', [res.json().id])

        // Get user details
        const user = await app.inject({
            url: "/api/v1/user",
            method: "GET",
            headers: {
                "authorization": `Bearer ${token.json().token}`
            }
        })
        t.equal(user.statusCode, 404)
    })
})