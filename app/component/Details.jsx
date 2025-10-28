"use client";

import { motion, AnimatePresence } from "framer-motion";

const Details = ({
  selectedPokemon,
  pokemonDetails,
  activeType,
  setActiveType,
}) => {
  return (
    <div className="border-2 border-black rounded-lg p-4 bg-gray-50 h-[700px] overflow-y-auto">
      {pokemonDetails ? (
        <div>
          <div className="flex flex-col items-center mb-4">
            <img
              src={pokemonDetails.sprites?.front_default}
              alt={pokemonDetails?.name}
              className="w-32 h-32"
            />
            <h2 className="text-2xl font-bold capitalize mt-2">
              {pokemonDetails?.name}
            </h2>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Types:</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {pokemonDetails?.types?.map((t) => (
                <button
                  key={t?.type?.name}
                  onClick={() => setActiveType(t?.type?.name)}
                  className={`px-3 py-1 border-2 border-black rounded capitalize transition-all duration-200 ${activeType === t.type.name
                    ? "bg-yellow-300"
                    : "bg-white hover:bg-gray-100"
                    }`}
                >
                  {t?.type?.name}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeType}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="p-3 border-t border-black mt-2"
            >
              <h4 className="text-lg font-semibold mb-2">
                Type:{" "}
                <span className="capitalize text-yellow-600">
                  {activeType}
                </span>
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>
                  <b>
                    Game Indices Count:</b>
                  {" "}
                  {pokemonDetails?.game_indices.length}
                </li>
                <li>
                  <b>Total Moves Count:</b>
                  {pokemonDetails.moves.length}
                </li>
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : selectedPokemon ? (
        <p className="text-center mt-10 text-lg">
          Loading details...
        </p>
      ) : (
        <p className="text-center text-gray-600 mt-10">
          Click a Pokemon to view details
        </p>
      )}
    </div>
  );
}

export default Details;
