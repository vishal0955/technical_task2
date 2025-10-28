"use client";

import { useEffect, useState } from "react";
import PokemonTable from "../component/Table";
import PokemonDetails from "../component/Details";
import Loader from "../component/Loader";

const PokePage = () => {
    const [pokemons, setPokemons] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [activeType, setActiveType] = useState("");
    const limit = 10;

    useEffect(() => {
        const fetchPokemons = async () => {
            setLoading(true);
            setError("");
            try {
                const offset = (page - 1) * limit;
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch Pokemon list.");
                }
                const data = await res.json();
                setPokemons(data.results);
                setTotalPages(Math.ceil(data.count / limit));
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message || "Something went wrong while fetching Pokemon.");
            }
        };

        fetchPokemons();
    }, [page]);

    useEffect(() => {

        if (!selectedPokemon) {
            return;
        }

        const fetchDetails = async () => {
            setPokemonDetails(null);
            setError("");
            try {
                const res = await fetch(selectedPokemon.url);
                if (!res.ok) {
                    throw new Error("Failed to fetch Pokemon details.");
                }

                const data = await res.json();
                setPokemonDetails(data);

                if (data?.types?.length > 0) {
                    setActiveType(data.types[0].type.name);
                }
            } catch (err) {
                setError(err.message || "Something went wrong loading details.");
            }
        };

        fetchDetails();
    }, [selectedPokemon]);

    const handlePrev = () => page > 1 && setPage(page - 1);
    const handleNext = () => page < totalPages && setPage(page + 1);

    const handleRetry = () => {
        setError("");
        setSelectedPokemon(null);
        setPage(1);
    };

    return (
        <div className="w-screen min-h-screen bg-white text-black p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Pokemon List
            </h1>

            {error && (
                <div
                    className="mb-6 p-4 border-2 border-red-400 bg-red-50 text-red-700 rounded flex justify-between items-center"
                >
                    <span>
                        {error}
                    </span>
                    <button
                        onClick={handleRetry}
                        className="px-3 py-1 border border-red-500 bg-red-100 rounded hover:bg-red-200 transition"
                    >
                        Retry
                    </button>
                </div>
            )}

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                    {loading ? (
                        <Loader />
                    ) : (
                        <PokemonTable
                            pokemons={pokemons}
                            page={page}
                            totalPages={totalPages}
                            handlePrev={handlePrev}
                            handleNext={handleNext}
                            limit={limit}
                            loading={loading}
                            setSelectedPokemon={setSelectedPokemon}
                        />
                    )}
                </div>
                <div className="col-span-1">
                    {pokemonDetails ? (
                        <PokemonDetails
                            selectedPokemon={selectedPokemon}
                            pokemonDetails={pokemonDetails}
                            activeType={activeType}
                            setActiveType={setActiveType}
                        />
                    ) : selectedPokemon && !error ? (
                        <Loader />
                    ) : (
                        <p className="text-center text-gray-600 mt-10">
                            Click a Pokemon to view details
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PokePage;
