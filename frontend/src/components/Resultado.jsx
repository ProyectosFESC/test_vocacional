import { useLocation } from 'react-router-dom';
import '../../public/styles/resultado.css';

function Resultado() {
  const location = useLocation();
  const { respuestaMasSeleccionada } = location.state || {};

  const mensajes = {
    1: 'Parece que te encanta el arte y el diseño gráfico.',
    2: '¡La moda y el estilo son lo tuyo!',
    3: 'La tecnología y la programación parecen ser tu área de interés.',
    4: 'El comercio internacional y los negocios son lo tuyo.',
    5: 'Te interesa la gestión financiera y la contabilidad.',
    6: '¡Te apasiona el turismo y organizar eventos culturales!'
  };

  return (
    <div className="resultado">
      <h1>Resultado del Test:</h1>
      {respuestaMasSeleccionada ? (
        <p>{mensajes[respuestaMasSeleccionada]}</p>
      ) : (
        <p>No se pudo determinar un resultado.</p>
      )}
    </div>
  );
}

export default Resultado;
