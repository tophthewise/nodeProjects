const express = require("express");
//use process.env varibles to keep private variables
require("dotenv").config;

// Express Middleware
const helmet = require("helmet"); //creates heaers that protect from attacks (security)
const bodyParser = require("body-parser"); //turns response into usable format
const cors = require("cors"); // allows/disallows cross-site communication
const morgan = require("morgan"); //logs requests

//db Connection with local Host
var db = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "",
    password: "",
    database: "crud-practice-1",
  },
});

//Controllers: aka the db queries
const main = require("./controllers/main");

// App
const app = express();

//App middleware
const whitelist = ["http://localhost:3001"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed by CORS"));
    }
  },
};
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(morgan("combined")); //use tiny or combined

// App Routs - Auth
app.get("/", (req, res) => res.send("hello world"));
app.get("/crud", (req, res) => main.getTableData(req, res, db));
app.post("/crud", (req, res) => main.postTableData(req, res, db));
app.put("/crud", (req, res) => main.putTableData(req, res, db));
app.delete("/crud", (req, res) => main.deleteTableData(req, res, db));

// App Server Connection
app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`);
});
