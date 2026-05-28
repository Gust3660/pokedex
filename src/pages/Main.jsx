import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import Card from "../components/Card";

const Main = () => {

    const [lista, setLista] = useState([]);
    const [listaCompleta, setListaCompleta] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [offset, setOffset] = useState(0);

    const LIMIT = 20;

    // OBTENER TODOS LOS POKEMONES
    const obtenerTodosLosPokemons = async () => {

        try {

            const response = await fetch(
                "https://pokeapi.co/api/v2/pokemon?limit=9999"
            );

            const data = await response.json();

            setListaCompleta(data.results);

            // MOSTRAR SOLO LOS PRIMEROS 20
            setLista(data.results.slice(0, LIMIT));

        } catch (error) {

            console.error(error);

            toast.error(
                "Intenta recargar la página nuevamente"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        obtenerTodosLosPokemons();

    }, []);

    // CARGAR MÁS
    const cargarMas = async () => {

        try {

            setLoadingMore(true);

            const nuevoOffset = offset + LIMIT;

            setOffset(nuevoOffset);

            const nuevosPokemons = listaCompleta.slice(
                0,
                nuevoOffset + LIMIT
            );

            setLista(nuevosPokemons);

        } catch (error) {

            console.error(error);

        } finally {

            setLoadingMore(false);

        }
    };

    // FILTRAR POKEMONES
    const pokemonsFiltrados = useMemo(() => {

        if (busqueda.trim() === "") {

            return lista;

        }

        return listaCompleta.filter((pokemon) =>
            pokemon.name
                .toLowerCase()
                .includes(busqueda.toLowerCase())
        );

    }, [lista, listaCompleta, busqueda]);

    // LOADING PRINCIPAL
    if (loading) {

        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "#f2f2f2",
                }}
            >
                <ClipLoader
                    size={80}
                    color="#000"
                />
            </div>
        );
    }

    return (
        <div
            style={{
                backgroundColor: "#f2f2f2",
                minHeight: "100vh",
                padding: "20px",
            }}
        >

            {/* BUSCADOR */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "30px",
                }}
            >
                <input
                    type="text"
                    placeholder="Buscar Pokémon..."
                    value={busqueda}
                    onChange={(e) =>
                        setBusqueda(e.target.value)
                    }
                    style={{
                        width: "100%",
                        maxWidth: "400px",
                        padding: "14px 20px",
                        borderRadius: "999px",
                        border: "2px solid #000",
                        outline: "none",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                />
            </div>

            {/* SIN RESULTADOS */}
            {pokemonsFiltrados.length === 0 && (
                <h2
                    style={{
                        textAlign: "center",
                        marginTop: "40px",
                        fontSize: "1.8rem",
                        color: "#555",
                        fontWeight: "bold",
                    }}
                >
                    No se ha encontrado ningún Pokémon
                </h2>
            )}

            {/* LISTA */}
            <ul
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "20px",
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                }}
            >
                {pokemonsFiltrados.map((pokemon) => (
                    <Card
                        key={pokemon.name}
                        pokemon={pokemon}
                    />
                ))}
            </ul>

            {/* BOTÓN CARGAR MÁS */}
            {busqueda === "" &&
                lista.length < listaCompleta.length && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "40px",
                        }}
                    >
                        <button
                            onClick={cargarMas}
                            disabled={loadingMore}
                            style={{
                                padding: "14px 30px",
                                borderRadius: "999px",
                                border: "none",
                                backgroundColor: "#000",
                                color: "#fff",
                                fontSize: "1rem",
                                fontWeight: "bold",
                                cursor: "pointer",
                                minWidth: "180px",
                            }}
                        >
                            {loadingMore ? (
                                <ClipLoader
                                    size={22}
                                    color="#fff"
                                />
                            ) : (
                                "Cargar más"
                            )}
                        </button>
                    </div>
                )}

        </div>
    );
};

export default Main;