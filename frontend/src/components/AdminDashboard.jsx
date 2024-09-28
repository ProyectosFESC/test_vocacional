import { useState, useEffect } from 'react';
import '../../public/styles/dashboard.css';

function AdminDashboard() {
  const apiUrl = import.meta.env.VITE_API_URL
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('');
  const [profileFilter, setProfileFilter] = useState('');
  const [students, setStudents] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSchoolFilter = (e) => {
    setSchoolFilter(e.target.value);
  };

  const handleProfileFilter = (e) => {
    setProfileFilter(e.target.value);
  };

  useEffect(() => {
    // Obtener todos los estudiantes al cargar el componente
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${apiUrl}/estudiantes`); 
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        } else {
          setError('Error al obtener los estudiantes del servidor.');
        }
      } catch (error) {
        console.error('Error de red al obtener estudiantes:', error);
        setError('Error de conexión. Por favor, verifica tu conexión a internet.');
      } finally {
        setLoading(false); 
      }
    };

    fetchStudents();
  }, []); 

  const handleFilter = async () => {
    setLoading(true); 
    try {
      const queryParams = new URLSearchParams({
        searchTerm,
        schoolFilter,
        profileFilter,
      }).toString();

      const response = await fetch(`${apiUrl}/estudiantes/filtrar?${queryParams}`);
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
        setError(null); 
      } else {
        setError('Error al filtrar los estudiantes.');
      }
    } catch (error) {
      console.error('Error de red al filtrar estudiantes:', error);
      setError('Error de conexión. Por favor, verifica tu conexión a internet.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Panel de Administración</h1>

      <div className="filter-container">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={schoolFilter} onChange={handleSchoolFilter}>
          <option value="">Todos los colegios</option> {/* Opción para mostrar todos */}
          <option value="COMFANORTE">COMFANORTE</option>
          <option value="JULIO PEREZ FERRERO">JULIO PEREZ FERRERO</option>
          <option value="SANTA CECILIA">SANTA CECILIA</option>
          <option value="SANTISIMA TRINIDAD">SANTISIMA TRINIDAD</option>
          <option value="CLARETIANO">CLARETIANO</option>
          <option value="JUAN ATALAYA">JUAN ATALAYA</option>
          <option value="ORIENTAL 26">ORIENTAL 26</option>
        </select>

        <select value={profileFilter} onChange={handleProfileFilter}>
          <option value="">Todos los perfiles</option>
          <option value="Gráfico">Gráfico</option>
          <option value="Modas">Modas</option>
          <option value="Software">Software</option>
          <option value="Negocios">Negocios</option>
          <option value="Financiero">Financiero</option>
          <option value="Turismo">Turismo</option>
        </select>
        <button onClick={handleFilter} type="button">Filtrar</button> {/* Cambiamos el tipo a "button" */}
      </div>

      {loading && <div>Cargando...</div>} 
      {error && <div className="error">{error}</div>} 

      <div className="responses">
        {!loading && !error && students.map((student, index) => (
          <div key={index} className="response-card">
            <p><strong>Nombre:</strong> {student.name}</p>
            <p><strong>Colegio:</strong> {student.school}</p>
            <p><strong>Perfil:</strong> {student.profile || 'Sin perfil'}</p>             
     
          </div>        
        ))}

      </div>
    </div>
  );
}

export default AdminDashboard;