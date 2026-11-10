import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {BiCameraMovie, BiSearchAlt2} from "react-icons/bi";

import './Navbar.css';


const Navbar = () => {
        const [search, setSearch] = useState("");
        const navigate = useNavigate();


        const handleSubmit = (e) => {
            e.preventDefault();
            const query = search.trim();
            if (!query) return;


            navigate(`/search?q=${encodeURIComponent(query)}`);
            setSearch("");
        }


    return (
        <div>
            <nav id="navbar">
                {/* Link para voltar a pagina inicial. */}
                <h2>
                    <Link to="/"> <BiCameraMovie /> MoviesLib</Link>
                </h2>
                {/* Envia o texto digitado como parametro "q" para a pagina de busca. */}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="q"
                        placeholder="Buscar filmes..."
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <button type="submit"> <BiSearchAlt2 /></button>
                </form>
            </nav>
        </div>
    );

};

export default Navbar;