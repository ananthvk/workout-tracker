import { build } from '../helper.js'
import t from 'tap'

t.test('api root url test', async (t) => {
    const app = await build(t)

    const res = await app.inject({
        url: '/api/v1'
    })
    t.equal(res.payload, "API")
})

t.test('api home url test', async (t) => {
    const app = await build(t)
    const res = await app.inject({
        url: '/'
    })
    t.equal(res.statusCode, 302)
})