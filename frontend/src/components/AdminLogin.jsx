import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../../public/styles/login.css';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
   // Agregar estado para el mensaje de error
    const navigate = useNavigate(); 
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3006/estudiantes/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // No se necesita manejar el token
        navigate('/admin-dashboard'); // Redirigir al dashboard
      } else {
        const errorData = await response.json();
        setError(errorData.error); 
      }
    } catch (error) {
      console.error('Error de red:', error);
      setError('Error de conexión. Por favor, verifica tu conexión a internet.');
    }
  };
  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      {error && <div className="error">{error}</div>} {/* Mostrar el mensaje de error */}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Introduce tu email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Introduce tu contraseña"
            required
          />
        </div>
        <button type="submit" className="login-btn">Entrar</button>
      </form>
    </div>
  );
}

export default AdminLogin;
