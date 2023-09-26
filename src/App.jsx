import { useState, useEffect } from "react"

import "./App.css"
import Aside from "./components/Aside"
import Card from "./components/Card"

const API_URL = "https://pokeapi.co/api/v2/pokemon/"
const POKEMON_LIST_EASY = ["pikachu", "charmander", "dragonite", "squirtle", "bulbasaur", "gyarados", "psyduck", "snorlax", "mewtwo", "mew"]

function App() {
	const [pokemonList, setPokemonList] = useState([])

	// Fetch api
	useEffect(() => {
		function fetchPokemon(pokemonName) {
			fetch(API_URL + pokemonName, { mode: "cors" })
				.then((res) => res.json())
				.then((pokemon) => {
					const URL = pokemon.sprites.other["official-artwork"].front_default
					const pokemonData = { name: pokemon.name, id: pokemon.id, url: URL }

					setPokemonList((prev) => [...prev, pokemonData])
				})
		}

		POKEMON_LIST_EASY.forEach((pokemon) => fetchPokemon(pokemon))

		return () => {
			const emptyArray = []
			setPokemonList(emptyArray)
		}
	}, [])

	return (
		<>
			<Aside />
			<main id="card-list">
				{console.log(pokemonList)}
				{pokemonList.map((pokemon) => {
					return (
						<Card
							key={pokemon.id}
							pokemonURL={pokemon.url}
						/>
					)
				})}
			</main>
		</>
	)
}

export default App
