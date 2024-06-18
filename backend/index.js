require("dotenv").config();

const Fastify = require("fastify");
const jwt = require("@fastify/jwt");
const cors = require("@fastify/cors");
const fastifybcrypt = require("fastify-bcrypt");

const tokenSecret = process.env.TOKEN_SECRET;

if(!tokenSecret) {
    console.error("TOKEN_SECRET is required");
    process.exit(1);
}

const server = Fastify({ logger: true });

server.register(jwt, { secret: tokenSecret });
server.register(cors, { origin: "*" }); // TODO : mettre l'adresse du front sur localhost et render
server.register(fastifybcrypt);

// init routes
require("./routes")(server);

const port = process.env.PORT || 3000;

server.listen({ host: '0.0.0.0', port }, (err, address) => {
    if (err) 
        throw err;

    server.log.info(`server listening on ${address}`);
});