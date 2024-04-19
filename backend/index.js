require("dotenv").config();

const Fastify = require("fastify");
const products = require("./products.json");

const jwt = require("@fastify/jwt");
const cors = require("@fastify/cors");

const tokenSecret = process.env.TOKEN_SECRET;

if(!tokenSecret) {
    console.error("TOKEN_SECRET is required");
    process.exit(1);
}

const server = Fastify({ logger: true });

server.register(jwt, { secret: tokenSecret });
server.register(cors, { origin: "*" }); // TODO : mettre l'adresse du front sur localhost et render

server.get("/", async (request, reply) => {    
    return { hello: "world" };
});

server.get("/protected", async (request, reply) => {
    try {
        await request.jwtVerify();
        return { protected: "data" };
    } catch (err) {
        reply.code(401).send({ message: "Unauthorized" });
    }
});

server.post("/login", async (request, reply) => {
    const { username, password } = request.body;

    // Simulate a login
    if(username === "admin" && password === "admin") {
        const token = server.jwt.sign({ username });
        return { token };
    }

    reply.code(401).send({ message: "Unauthorized" });
});

server.get("/products", async (request, reply) => {
    return products;
});

const port = process.env.PORT || 3000;

server.listen({ host: '0.0.0.0', port }, (err, address) => {
    if (err) 
        throw err;

    server.log.info(`server listening on ${address}`);
});