const { Op } = require("sequelize");
const { init, User, Product, Category } = require("./database");

// on initialise la base de données avant de lancer le serveur
init();

module.exports = function(server) {
    
    server.get("/", async (request, reply) => {    
        return { hello: "world" };
    });

    server.get("/me", async (request, reply) => {
        try {
            await request.jwtVerify();

            return await User.findByPk(request.user.id);
        } catch (err) {
            reply.code(401).send({ message: "Unauthorized" });
        }
    });

    server.post("/login", async (request, reply) => {
        const { username, password } = request.body;

        const user = await User.findOne({ where: { username } });

        if(!user) {
            reply.code(400).send({ message: "Invalid credentials" });
            return;
        }

        if(!(await server.bcrypt.compare(password, user.password))) {
            reply.code(400).send({ message: "Invalid credentials" });
            return
        }

        const token = server.jwt.sign({ id: user.id, username: user.username});

        return reply.code(200).send({ token });
    });

    server.post("/register", async (request, reply) => {
        const { username, password } = request.body;

        const user = await User.findOne({ where: { username } });

        if(user) {
            reply.code(400).send({ message: "User already exists" });
            return;
        }

        const hashedPassword = await server.bcrypt.hash(password);

        await User.create({ username, password: hashedPassword });

        return reply.code(201).send({ message: "User created" });
    });

    server.get("/products", async (request, reply) => {
        const { q } = request.query;

        if(!q) {
            return await Product.findAll({
                include: [{
                    model: Category,
                    as: "category"
                }]
            });
        }

        return await Product.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.iLike]: `%${q}%`
                        }
                    },
                    {
                        description: {
                            [Op.iLike]: `%${q}%`
                        }
                    }
                ]
            },
            include: [{
                model: Category,
                as: "category",
                where: {
                    name: {
                        [Op.iLike]: `%${q}%`
                    }
                },
                required: false
            }]
        });
    });
}