const express = require('express');
const morgan = require('morgan')
const app = express();
const taskRoutes = require('./routes/task.routes');
const path = require('path')
const {mongoose} = require('./resource/db');

//Settings
app.set('port', process.env.PORT || 3000)

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/task', taskRoutes);

//Routes

// Statics files
app.use(express.static(path.join(__dirname, 'public')))

//Despliegue server
app.listen(app.get('port'), _ => {
    console.log(`Server on port ${app.get('port')}`);
});

