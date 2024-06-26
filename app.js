require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');


(async() => {

    try {
        await mongoose.connect(process.env.MONGO_UIR_TEST);
        console.log('Conectado a Mongo DB');
    } catch (error) {
        console.log(error);
    }

})();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Rutas frontend
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/inicio', express.static(path.resolve('views', 'inicio')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));



app.use(morgan('tiny'));
//Rutas backend
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);





module.exports = app;