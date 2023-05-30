// Importamos el módulo 'express'
const express = require('express');

// Importamos el enrutador definido en './routes'
const routerApi = require('./routes');

// Importamos middlwares de errores definidos en ./middlewares
const { logErrors, errorHandler } = require('./middlewares/error.handler');

// Creamos una instancia de la aplicación express
const app = express();

// Definimos el número de puerto en el que se ejecutará el servidor
const port = 3000;

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Ruta principal que devuelve un mensaje de bienvenida
app.get('/', (req, res) => {
    res.send('Welcome to our first APIrest');
});

// Configuración de las rutas utilizando el enrutador importado
routerApi(app);

// Middleware para registrar errores de la aplicación
app.use(logErrors);

// Middleware para manejar errores
app.use(errorHandler);

// Iniciamos el servidor en el puerto especificado
app.listen(port, () => {
    console.log('Server running on port: ' + port);
});
