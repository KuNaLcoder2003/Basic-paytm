const zod = require('zod')


const sigin_schema = zod.object({
    username : zod.string().email(),
    password : zod.string().min(5)
})

module.exports = sigin_schema