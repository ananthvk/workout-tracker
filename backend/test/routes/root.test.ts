import { build } from '../helper.js'
import t from 'tap'

t.test('api root url', async (t) => {
    const app = await build(t)

    const res = await app.inject({
        url: '/'
    })
    
    t.equal(res.statusCode, 302)
})