import { useState, useEffect } from "react"

import "./App.css"
import Aside from "./components/Aside"
import Card from "./components/Card"

const API_URL = "https://pokeapi.co/api/v2/pokemon/"
const DEFAULT_POKEMON_ID = 1

function App() {
	const [pokemon, setPokemon] = useState("")

	// Fetch api
	useEffect(() => {
		fetch("https://pokeapi.co/api/v2/pokemon/1", { mode: "cors" })
			.then((res) => res.json())
			.then((pokemon) => {
				const URL = pokemon.sprites.other["official-artwork"].front_default
				setPokemon(URL)
				console.log(URL)
			})
	}, [])

	return (
		<>
			<Aside />
			<main id="card-list">
				<Card pokemonURL={pokemon} />
				{/* <Card />
				<Card /> */}
			</main>
		</>
	)
}

export default App
