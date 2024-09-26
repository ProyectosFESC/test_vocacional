import '../../public/styles/inicio.css';

const Inicio = () => {

  return (
    <div className="App">
      <div className="inicio-container">
        
        <div className="image-container">
          <img 
            src="https://raw.githubusercontent.com/TheYaru/test_vocacional/main/frontend/public/images/ImagenInicio.jpg" 
            alt="Imagen de inicio"
            className="background-img"
          />
        </div>

        <div className='content'>
          
        </div>

        <div className='button-container'>
          <a href="/formularioEstudiante" className="start-button">
            Comenzar
          </a>
        </div>
      </div>
    </div>
  );
}

export default Inicio;

