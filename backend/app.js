const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
require('dotenv').config();

// Express config
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.APP_PORT || 3000;
// home route
app.get('/', (req, res) => {
    res.json({ message: 'Default home page' });
});

// routes
require('./routes/auth.routes')(app);
//require("./app/routes/user.routes")(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
