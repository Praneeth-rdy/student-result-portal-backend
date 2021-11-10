// Third party imports
require('dotenv').config({ path: './config.env' });
const express = require('express');

const cors = require('cors');

// node inbuilt package imports
const path = require('path');

// filesystem imports
const { sequelize } = require('./models'); // import all the models
const errorHandler = require('./middleware/error');

// Creating an express app
const app = express();

global.__basedir = __dirname;

// Configuring the views folder using which the controllers serve the webpages
app.set("views", path.join(__dirname, "views"));
// By setting view engine here, there is no need to mention file extension again in controllers
app.set('view engine', 'ejs');


const corsOptions = {
    "origin": ['http://localhost:4200', '*'],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true
}

app.use(cors(corsOptions));


app.use(express.json());

app.use('/api', require('./routes/main'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/private', require('./routes/private'));

// Error Handler (Should be last piece of middleware)
app.use(errorHandler);

// Setting port as a key 'port' to the app
app.set('port', process.env.PORT || 5050);

app.get('/', (request, response) => {
    response.send("Hello World");
});


// 404 middleware
app.use((request, response, next) => {
    response.status(404)
        .send("Oops! The page you are looking for doesn't exist");
    next();
});

// Error Handler (Should be last piece of middleware)
app.use(errorHandler);

// Listening at the port set before
const server = app.listen(app.get('port'), () => {
    // Creates all the tables required, if not exist
    sequelize.sync().then(() => {
        // Logging after promise resolve
        console.log('DB sequelized\n');
    }).catch((err) => {
        // loggin if there is any error while sequelizing
        console.log(err.message);
    });

    // Loggin the server host name and port
    console.log(`Server Running at http://${(process.env.NODE_ENV === 'production') ? '172.105.49.237' : 'localhost'}:${app.get('port')}/`)
});

process.on('unhandledRejection', (error, promise) => {
    console.log(`Logged Error: ${error}`);
    server.close(() => { process.exit(1) });
});