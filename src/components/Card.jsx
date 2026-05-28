import React, { useEffect, useState } from "react";

const Card = ({ pokemon }) => {

    const [imagen, setImagen] = useState("");
    const [numero, setNumero] = useState("");
    const [tipos, setTipos] = useState([]);
    const [hover, setHover] = useState(false);

    const pokemonTypesColor = {
        normal: "bg-stone-400",
        fire: "bg-orange-400",
        water: "bg-blue-500",
        electric: "bg-yellow-400",
        grass: "bg-green-500",
        ice: "bg-cyan-500",
        fighting: "bg-red-700",
        poison: "bg-purple-600",
        ground: "bg-amber-600",
        flying: "bg-indigo-400",
        psychic: "bg-pink-500",
        bug: "bg-lime-500",
        rock: "bg-yellow-700",
        ghost: "bg-violet-700",
        dragon: "bg-indigo-700",
        dark: "bg-zinc-700",
        steel: "bg-slate-400",
        fairy: "bg-pink-300",
        stellar: "bg-teal-400",
        unknown: "bg-gray-500",
    };

    useEffect(() => {

        const obtenerPokemon = async () => {

            try {

                const response = await fetch(pokemon.url);
                const data = await response.json();

                // IMAGEN HD TRANSPARENTE
                const imagenPokemon =
                    data?.sprites?.other?.home?.front_default ||
                    data?.sprites?.other?.["official-artwork"]?.front_default;

                setImagen(imagenPokemon);

                // NUMERO
                setNumero(data.id);

                // TIPOS
                const tiposPokemon = data.types.map(
                    (tipo) => tipo.type.name
                );

                setTipos(tiposPokemon);

            } catch (error) {

                console.error(error);

            }
        };

        obtenerPokemon();

    }, [pokemon]);

    return (
        <li
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                width: "240px",
                borderRadius: "24px",
                listStyle: "none",
                position: "relative",
                overflow: "visible",
                cursor: "pointer",
                transform: hover ? "scale(1.05)" : "scale(1)",
                transition: "all 0.25s ease",
            }}
        >

            {/* IMAGEN */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "190px",
                    position: "relative",
                    zIndex: 2,
                    marginBottom: "-55px",
                }}
            >
                <img
                    src={imagen}
                    alt={pokemon.name}
                    style={{
                        width: "170px",
                        height: "170px",
                        objectFit: "contain",
                        display: "block",
                        transition: "all 0.25s ease",
                        transform: hover ? "translateY(-8px)" : "translateY(0px)",
                    }}
                />
            </div>

            {/* TARJETA */}
            <div
                className="bg-black"
                style={{
                    borderRadius: "24px",
                    padding: "70px 20px 25px",
                    color: "#fff",
                    textAlign: "center",
                    minHeight: "170px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    boxShadow: hover
                        ? "0 10px 28px rgba(255,255,255,0.18)"
                        : "0 6px 18px rgba(0,0,0,0.18)",
                    transition: "all 0.25s ease",
                    border: hover
                        ? "1px solid rgba(255,255,255,0.18)"
                        : "1px solid transparent",
                }}
            >

                {/* NUMERO */}
                <span
                    className="text-yellow-400"
                    style={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                        textShadow: "2px 2px 0px #2A75BB",
                        marginBottom: "10px",
                    }}
                >
                    #{numero}
                </span>

                {/* NOMBRE */}
                <h2
                    className="text-white"
                    style={{
                        margin: 0,
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                    }}
                >
                    {pokemon.name}
                </h2>

                {/* TIPOS */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                        flexWrap: "wrap",
                        marginTop: "16px",
                    }}
                >
                    {tipos.map((tipo, index) => (

                        <span
                            key={index}
                            className={`${pokemonTypesColor[tipo]} text-white`}
                            style={{
                                border: "1px solid rgba(255,255,255,0.2)",
                                padding: "7px 14px",
                                borderRadius: "999px",
                                fontSize: "0.85rem",
                                textTransform: "capitalize",
                                fontWeight: "bold",
                            }}
                        >
                            {tipo}
                        </span>

                    ))}
                </div>

            </div>

        </li>
    );
};

export default Card;