"use client";

const Table = ({
    pokemons,
    page,
    totalPages,
    handlePrev,
    handleNext,
    limit,
    loading,
    setSelectedPokemon,
}) => {
    return (
        <div className="flex flex-col h-[700px]">
            {loading ? (
                <p className="text-center text-lg flex-1 flex items-center justify-center">
                    Loading...
                </p>
            ) : (
                <>
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full border-2 border-black text-lg table-fixed">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border-2 border-black px-6 py-3 text-left w-[20%]">
                                        Sr. Number
                                    </th>
                                    <th className="border-2 border-black px-6 py-3 text-left w-[80%]">
                                        Poke Name
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {pokemons.map((pokemon, index) => (
                                    <tr
                                        key={pokemon.name}
                                        className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            } hover:bg-yellow-100 cursor-pointer`}
                                        onClick={() => setSelectedPokemon(pokemon)}
                                    >
                                        <td className="border-2 border-black px-6 py-3 text-center w-[20%]">
                                            {(page - 1) * limit + (index + 1)}
                                        </td>
                                        <td className="border-2 border-black px-6 py-3 capitalize w-[80%] whitespace-nowrap overflow-hidden text-ellipsis">
                                            {pokemon.name}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4 border-t border-black pt-4">
                        <span className="text-lg">
                            Page <b>{page}</b> of <b>{totalPages}</b>
                        </span>

                        <div className="flex gap-4">
                            <button
                                onClick={handlePrev}
                                disabled={page === 1}
                                className={`px-4 py-2 border-2 border-black rounded ${page === 1
                                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                        : "bg-white hover:bg-gray-100"
                                    }`}
                            >
                                Previous
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={page === totalPages}
                                className={`px-4 py-2 border-2 border-black rounded ${page === totalPages
                                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                        : "bg-white hover:bg-gray-100"
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}


export default Table;