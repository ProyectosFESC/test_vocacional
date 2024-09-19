import {BrowserRouter, Route, Routes} from 'react-router-dom'
import FormularioData from '../components/Formulario1'
import FormularioData2 from '../components/Formulario2'
import Inicio from '../components/Inicio'
const Routing = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route element={<Inicio/>} path='/'/>
        <Route element={<FormularioData/>} path='/formularioEstudiante'/>
        <Route element={<FormularioData2/>} path='/formularioPreguntas'/>
      </Routes>
    </BrowserRouter>


  )
}

export default Routing