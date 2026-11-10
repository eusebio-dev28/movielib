import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar' 


function App() {
  return (
    <div className="App">
      <Navbar />
      {/* Renderiza o componente da rota filha: Home, Movie ou Search. */}
      <Outlet />
    </div>
  )
}

export default App;
