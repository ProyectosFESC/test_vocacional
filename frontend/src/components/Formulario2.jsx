import { useState } from "react";

function Formulario2() {
  const [respuestas, setRespuestas] = useState({
    pregunta1: '',
    pregunta2: '',
    pregunta3: '',
    pregunta4: '',
    pregunta5: '',
    pregunta6: '',
    pregunta7: '', 
    pregunta8: '',
    pregunta9: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRespuestas(prevRespuestas => ({
      ...prevRespuestas,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Respuestas del formulario:', respuestas);

    try {
      const response = await fetch("http://localhost:3001/estudiantes/guardar-datos", { // O la ruta que uses en tu backend
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(respuestas),
      });

      if (response.ok) {
        // const nuevoEstudiante = await response.json(); // Si el backend devuelve datos, puedes manejarlos aquí
        console.log('Datos guardados exitosamente');
        // Puedes redirigir al usuario o mostrar un mensaje de éxito
        alert('¡Gracias por completar el formulario! Tus respuestas han sido enviadas.'); 
      } else {
        const errorData = await response.json();
        console.error('Error al guardar datos:', errorData.error);
        // Muestra un mensaje de error al usuario
        alert('Hubo un error al enviar tus respuestas. Por favor, inténtalo de nuevo.'); 
      }
    } catch (error) {
      console.error('Error de red:', error);
      // Muestra un mensaje de error al usuario
      alert('Error de conexión. Por favor, verifica tu conexión a internet e inténtalo de nuevo.'); 
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Sección 1: Intereses Personales</h2>
      
      <label>
        1. ¿Qué te gusta hacer en tu tiempo libre?
        <select name="pregunta1" value={respuestas.pregunta1} onChange={handleChange}>
          <option value="">Selecciona una opción</option>
          <option value="1">Dibujar y crear diseños visuales.</option>
          <option value="2">Explorar estilos de moda y tendencias.</option>
          <option value="3">Resolver problemas con tecnología y software.</option>
          <option value="4">Leer sobre negocios y comercio internacional.</option>
          <option value="5">Administrar dinero y planificar presupuestos.</option>
          <option value="6">Organizar eventos y conocer nuevas culturas.</option>
          
        </select>
      </label>


      <label>
        2. ¿Qué tipo de actividades disfrutas más?
        <select name="pregunta2" value={respuestas.pregunta2} onChange={handleChange}>
          <option value="">Selecciona una opción</option>
          <option value="1">Crear gráficos y editar fotos.</option>
          <option value="2">Diseñar ropa y accesorios.</option>
          <option value="3">Programar y desarrollar aplicaciones.</option>
          <option value="4">Negociar y aprender sobre mercados globales.</option>
          <option value="5">Manejar finanzas y analizar datos económicos.</option>
          <option value="6">Planear viajes y actividades turísticas..</option>
          
        </select>
      </label>

      <label>
        3. ¿Cuál de las siguientes materias te interesa más?

        <select name="pregunta3" value={respuestas.pregunta3} onChange={handleChange}>
          <option value="">Selecciona una opción</option>
          <option value="1">Arte y Diseño.</option>
          <option value="2">Textiles y Moda.</option>
          <option value="3">Tecnología e Informática.</option>
          <option value="4">Economía y Comercio.</option>
          <option value="5">Matemáticas y Contabilidad.</option>
          <option value="6">Geografía y Cultura.</option>
          
        </select>
      </label>

      <h2>Sección 2: Habilidades</h2>
      
      <label>
        4. ¿Qué te gusta hacer en tu tiempo libre?
        <select name="pregunta4" value={respuestas.pregunta4} onChange={handleChange}>
          <option value="">Selecciona una opción</option>
          <option value="1">Dibujar y crear diseños visuales.</option>
          <option value="2">Explorar estilos de moda y tendencias.</option>
          <option value="3">Resolver problemas con tecnología y software.</option>
          <option value="4">Leer sobre negocios y comercio internacional.</option>
          <option value="5">Administrar dinero y planificar presupuestos.</option>
          <option value="6">Organizar eventos y conocer nuevas culturas.</option>
          
        </select>
      </label>


      <label>
        5. ¿Qué tipo de actividades disfrutas más?
        <select name="pregunta5" value={respuestas.pregunta5} onChange={handleChange}>
          <option value="">Selecciona una opción</option>
          <option value="1">Crear gráficos y editar fotos.</option>
          <option value="2">Diseñar ropa y accesorios.</option>
          <option value="3">Programar y desarrollar aplicaciones.</option>
          <option value="4">Negociar y aprender sobre mercados globales.</option>
          <option value="5">Manejar finanzas y analizar datos económicos.</option>
          <option value="6">Planear viajes y actividades turísticas..</option>
          
        </select>
      </label>

      <label>
        6. ¿Cuál de las siguientes materias te interesa más?

        <select name="pregunta6" value={respuestas.pregunta6} onChange={handleChange}>
          <option value="">Selecciona una opción</option>
          <option value="1">Arte y Diseño.</option>
          <option value="2">Textiles y Moda.</option>
          <option value="3">Tecnología e Informática.</option>
          <option value="4">Economía y Comercio.</option>
          <option value="5">Matemáticas y Contabilidad.</option>
          <option value="6">Geografía y Cultura.</option>
          
        </select>
      </label>

      <h2>Sección 3: Preferencias de Estudio y Trabajo</h2>
      <label>
        7. ¿Cómo prefieres trabajar?
        <select name="pregunta7" value={respuestas.pregunta4} onChange={handleChange}>
          <option value="">Selecciona una opción</option>
          <option value="1">De forma independiente, en proyectos de diseño gráfico.</option>
          <option value="2">En equipo, creando nuevas tendencias en moda..</option>
          <option value="3">Tanto de forma independiente como en equipo, desarrollando software.</option>
          <option value="4">En un entorno dinámico y global, interactuando con personas de diferentes culturas.</option>
          <option value="5">En un ambiente estructurado, gestionando finanzas.</option>
          <option value="6">En un entorno interactivo, organizando y gestionando experiencias turísticas.</option>
          
        </select>
      </label>


      <label>
      8. ¿Te gustaría viajar o trabajar en el extranjero?
        <select name="pregunta8" value={respuestas.pregunta5} onChange={handleChange}>
          <option value="">Selecciona una opción</option>
          <option value="1">No es mi prioridad, prefiero enfocarme en mi trabajo creativo.</option>
          <option value="2">Me gustaría, especialmente para explorar nuevas tendencias de moda.</option>
          <option value="3">Podría considerar trabajar en proyectos de tecnología en otros países.</option>
          <option value="4">Definitivamente, me interesa mucho el comercio internacional.</option>
          <option value="5">Solo si es necesario para mejorar mis habilidades financieras.</option>
          <option value="6">Sí, me encanta la idea de viajar y trabajar en el sector turístico.</option>
          
        </select>
      </label>

      <label>
      9. ¿Te interesaría emprender tu propio negocio?

        <select name="pregunta9" value={respuestas.pregunta6} onChange={handleChange}>
          <option value="">Selecciona una opción</option>
          <option value="1">Sí, un estudio de diseño gráfico.</option>
          <option value="2">Sí, una línea de moda propia.</option>
          <option value="3">Sí, una empresa de desarrollo de software.</option>
          <option value="4">Sí, una empresa de comercio internacional.</option>
          <option value="5">Sí, una firma de consultoría financiera..</option>
          <option value="6">Sí, una agencia de viajes o una empresa en la industria turística.</option>
          
        </select>
      </label>

      <button type="submit">Enviar</button>
    </form>
  );
}

export default Formulario2;