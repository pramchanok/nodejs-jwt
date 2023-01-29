const express     = require("express");
const cors        = require("cors");
const time        = require("express-timestamp");
//const db          = require('./config/db.config');
const app         = express();
//const sequelize   = db.sequelize;

require('dotenv').config()

process.env.TZ  = 'Asia/Bangkok'

//const db        = require("./models");
//const Role      = db.role;

var corsOptions = {
  origin: "http://localhost:3000",
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization",
  credentials: true,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.removeHeader("X-Powered-By");
  next();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(time.init)

/* sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
}); */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to api-service application." });
});

/* db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
} */

// Routers //
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/authors.routes')(app);
require('./routes/posts.routes')(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});