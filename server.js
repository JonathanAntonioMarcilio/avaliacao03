const express = require('express');
const database = require('./src/config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./src/config/swagger');

console.log('Starting server....')
const app = express()
app.use(express.json())

app.get('/', ( res) => {
    res.send({ response: 'Hello World!' });
})

// Rotas/Routes
require("./src/routes/categoryRoutes.js")(app);
require("./src/routes/orderRoutes.js")(app);
require("./src/routes/productRoutes.js")(app);
require("./src/routes/userRoutes.js")(app);

// Rota Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

database.db.sync({ force: false })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        })
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
    });