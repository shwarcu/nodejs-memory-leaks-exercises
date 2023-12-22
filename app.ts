import Fastify from 'fastify'
const fastify = Fastify({
    logger: true
})

const myStupidArray: string[] = ['start'];
global.myStupidArray = myStupidArray;

function leakingFunction() {
    for (let i = 0; i < 10; i++) {
        myStupidArray.push(`[${Date.now()}] Hello world ${myStupidArray.length}`);
    }
    return "Hello world";
}

fastify.get('/', async function handler(request, reply) {
    const responsePayload = leakingFunction();
    return { message: responsePayload }
})


fastify.get('/array', async function handler(request, reply) {
    return { array: myStupidArray }
})


fastify.listen({ port: 3000 }).catch(error => {
    fastify.log.error(error)
    process.exit(1)
})
