const { Sequelize } = require("sequelize");

const products = require("./products.json");

// init sequelize
const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
});

// on définit les modèles de sequelize
const User = sequelize.define("User", {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

const Product = sequelize.define("Product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    img: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

const Category = sequelize.define("Category", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

// on définit les relations entre les modèles
Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category'
});
Category.hasMany(Product, {
    foreignKey: 'categoryId',
    as: 'products'
});

// fonction pour rentrer des produits dans la bdd 
// Code pas forcément très propre ou opti, c'est juste pour initialiser la bdd avec des données
const insertProducts = async () => {
    const categories = products.map(product => product.category);
    const uniqueCategories = [...new Set(categories)];

    for (const category of uniqueCategories) {
        await Category.create({ name: category });
    }

    for (const product of products) {
        const category = await Category.findOne({ where: { name: product.category } });

        await Product.create({
            name: product.name,
            description: product.description,
            price: product.price,
            img: product.img,
            categoryId: category.id,
        });
    }
};

// on initialise le schema de la bdd
const init = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });

        await insertProducts();
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }

    return sequelize;
};

module.exports = { init, User, Product, Category };