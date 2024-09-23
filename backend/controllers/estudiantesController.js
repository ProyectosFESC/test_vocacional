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
exports.buscarPorNombre = async (req, res) => {
  try {
    const nombreBuscado = req.params.nombre;

    // Buscar el estudiante por nombre en la tabla Estudiante
    const estudiante = await Estudiante.findOne({ where: { nombre: nombreBuscado } });

    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    // Buscar la respuesta del estudiante en la tabla RespuestaEstudiante
    const respuestaEstudiante = await RespuestaEstudiante.findOne({ where: { id: estudiante.id } });

    if (!respuestaEstudiante) {
      return res.status(404).json({ error: 'Respuestas del estudiante no encontradas' });
    }

    // Construir la respuesta con el nombre del estudiante y la carrera elegida
    const resultado = {
      nombre: estudiante.nombre,
      carreraElegida: respuestaEstudiante.carreraElegida
    };

    res.json(resultado);
  } catch (error) {
    console.error('Error al buscar estudiante:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.obtenerEstadisticasCarreras = async (req, res) => {
  try {
    // 1. Consulta para contar estudiantes por carrera
    const resultado_query = await RespuestaEstudiante.findAll({
      attributes: ['carreraElegida', [Sequelize.fn('COUNT', Sequelize.col('carreraElegida')), 'conteo']],
      group: ['carreraElegida']
    });

    // 2. Calcular el total de estudiantes
    const total_estudiantes = resultado_query.reduce((total, resultado) => total + resultado.dataValues.conteo, 0);

    // 3. Calcular porcentajes y construir la respuesta
    const estadisticas = resultado_query.map(resultado => {
      const porcentaje = (resultado.dataValues.conteo / total_estudiantes) * 100;
      return {
        carrera: resultado.carreraElegida,
        conteo: resultado.dataValues.conteo,
        porcentaje: porcentaje
      };
    });

    // 4. Devolver los resultados al frontend
    res.json(estadisticas);
  } catch (error) {
    // Manejo de errores
    console.error('Error al obtener estadísticas de carreras:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.buscarPorColegio = async (req, res) => {
  try {
    const colegioBuscado = req.params.colegio;

    // Buscar estudiantes por colegio, incluyendo sus respuestas (utilizando la asociación)
    const estudiantes = await Estudiante.findAll({
      where: { colegio: colegioBuscado },
      include: RespuestaEstudiante // Incluir los datos de RespuestaEstudiante
    });

    if (estudiantes.length === 0) {
      return res.status(404).json({ error: 'No se encontraron estudiantes en ese colegio' });
    }

    // Construir la respuesta con el nombre del estudiante y la carrera elegida
    const resultado = estudiantes.map(estudiante => ({
      nombre: estudiante.nombre,
      carreraElegida: estudiante.RespuestaEstudiante ? estudiante.RespuestaEstudiante.carreraElegida : null // Manejar el caso en que no haya respuesta aún
    }));

    res.json(resultado);
  } catch (error) {
    console.error('Error al buscar estudiantes por colegio:', error);
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