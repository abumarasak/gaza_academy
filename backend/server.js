// Data base connection
require("./src/config/db");
// dotenv
require("dotenv").config();
// colors
const colors = require("colors");
const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./src/routes/index");
const { errorHandler } = require("./src/middleware/error_middleware");
const connectDB = require("./src/config/db");

// cors
app.use(cors());
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// routes
app.use(routes);
// database connection
connectDB();
// error handler
app.use(errorHandler);

module.exports = app;
