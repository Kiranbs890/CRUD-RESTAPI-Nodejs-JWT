const express = require('express');
const route = require('./routes/route');
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use("/api_v1",route(express));
app.listen(3000, () => {
    console.log('Success running 3000');
});

module.exports = app;