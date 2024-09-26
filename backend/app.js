const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const estudiantesRoutes = require('./routes/estudiantes');
const cors = require('cors');
const RespuestaEstudiante = require('./models/respuestasEstudiante');
const administradorRoutes = require('./routes/administrador');

const app = express();
const port = 3006;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/estudiantes', estudiantesRoutes); 
app.use('/administrador', administradorRoutes);


// Sincronizar el modelo con la base de datos (crear la tabla si no existe)
sequelize.sync()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente');
    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });