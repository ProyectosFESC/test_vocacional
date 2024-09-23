const Estudiante = require('../models/estudiante');
const RespuestaEstudiante = require('../models/respuestasEstudiante'); 

exports.guardarDatos = async (req, res) => {
  try {
    let estudiante;

    // Manejar datos del primer formulario
    if (req.body.colegio && req.body.nombre) { 
      // Buscar si el estudiante ya existe por correo electrónico
      estudiante = await Estudiante.findOne({ where: { correo: req.body.correo } });

      if (estudiante) {
        // Si el estudiante existe, actualizar sus datos 
        await estudiante.update({ 
          colegio: req.body.colegio, 
          nombre: req.body.nombre, 
          grado: req.body.grado, 
          telefono: req.body.telefono 
        });
      } else {
        // Si el estudiante no existe, crearlo
        estudiante = await Estudiante.create({
          colegio: req.body.colegio,
          nombre: req.body.nombre,
          grado: req.body.grado,
          correo: req.body.correo,
          telefono: req.body.telefono
        });
      }
    }

    // Manejar datos del segundo formulario (preguntas)
    if (req.body.pregunta1 && req.body.pregunta2) { 
      const { 
        pregunta1, 
        pregunta2, 
        pregunta3,
        pregunta4,
        pregunta5,
        pregunta6,
        pregunta7,
        pregunta8,
        pregunta9
      } = req.body;

      // Array con todas las respuestas
      const respuestasArray = [pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, pregunta6, pregunta7, pregunta8, pregunta9];

      // Encontrar la respuesta más repetida
      const conteoRespuestas = {};
      let respuestaMasRepetida = '';
      let maxRepeticiones = 0;

      for (const respuesta of respuestasArray) {
        conteoRespuestas[respuesta] = (conteoRespuestas[respuesta] || 0) + 1;
        if (conteoRespuestas[respuesta] > maxRepeticiones) {
          maxRepeticiones = conteoRespuestas[respuesta];
          respuestaMasRepetida = respuesta;
        }
      }

      // Obtener la carrera correspondiente a la respuesta más repetida
      const carreraElegida = carreraCorrespondiente(parseInt(respuestaMasRepetida));

      // Guardar las respuestas en la nueva tabla (sin asociar al estudiante)
      await RespuestaEstudiante.create({
        pregunta1, 
        pregunta2, 
        pregunta3,
        pregunta4,
        pregunta5,
        pregunta6,
        pregunta7,
        pregunta8,
        pregunta9,
        carreraElegida: carreraElegida
      });
    }

    res.json({ mensaje: 'Datos guardados exitosamente' }); 
  } catch (error) {
    console.error('Error al guardar los datos:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    } 

    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función auxiliar para obtener la carrera correspondiente a cada valor de respuesta
function carreraCorrespondiente(valor) {
  switch (valor) {
    case 1: return 'grafico';
    case 2: return 'modas';
    case 3: return 'software';
    case 4: return 'negocios';
    case 5: return 'financiero';
    case 6: return 'turismo';
    default: return null; 
  }
}