import { useState, useEffect } from "react"

import "./Styles.css"
import Aside from "./components/Aside"
import Card from "./components/Card"

const API_URL = "https://pokeapi.co/api/v2/pokemon/"
const POKEMON_LIST_EASY = ["pikachu", "charmander", "dragonite", "squirtle", "bulbasaur", "gyarados", "psyduck", "snorlax", "mewtwo", "mew"]

const getFethedURL = (data) => data.sprites.other["official-artwork"].front_default
const getRandomNumber = (maxNumber) => Math.floor(Math.random() * maxNumber)

function App() {
	const [pokemonList, setPokemonList] = useState([])
	const [clickedPokemon, setClickedPokemon] = useState([])
	const [currentPoints, setCurrentPoints] = useState(0)
	const [maxPoints, setMaxPoints] = useState(0)

	useEffect(() => {
		function fetchPokemon(pokemonName) {
			fetch(API_URL + pokemonName, { mode: "cors" })
				.then((res) => res.json())
				.then((pokemon) => {
					const URL = getFethedURL(pokemon)
					const { name, id } = pokemon
					const pokemonData = { name, id, url: URL }

					setPokemonList((prev) => [...prev, pokemonData])
				})
		}

		POKEMON_LIST_EASY.forEach((pokemon) => fetchPokemon(pokemon))

		return () => {
			const emptyArray = []
			setPokemonList(emptyArray)
		}
	}, [])

	function handleOnClick(e) {
		randomizePokemonListOrder()

		const { key } = e.target.dataset
		const pokemonID = parseInt(key)

		const wasAlreadyClicked = clickedPokemon.includes(pokemonID)
		if (!wasAlreadyClicked) {
			const newCurrentPoints = currentPoints + 5

			if (newCurrentPoints === 50) {
				setCurrentPoints(newCurrentPoints)
				setMaxPoints(newCurrentPoints)
				alert("Wow! You have an excelent memory. You clicked all Pokemon")
				setCurrentPoints(0)
				setClickedPokemon([])
			} else {
				const newList = randomizePokemonListOrder(10)
				setPokemonList(newList)
				setCurrentPoints(newCurrentPoints)
				setClickedPokemon((prev) => [...prev, pokemonID])
			}
		}

		if (wasAlreadyClicked) {
			if (currentPoints > maxPoints) setMaxPoints(currentPoints)
			setCurrentPoints(0)
			setClickedPokemon([])
			alert("You clicked the same pokemon twice")
		}
	}

	function randomizePokemonListOrder(numberOfTimes) {
		const listLength = pokemonList.length
		const currentPokemonList = pokemonList

		for (let i = 0; i < numberOfTimes; i++) {
			const randomNumber = getRandomNumber(listLength)
			const extractedPokemon = currentPokemonList[randomNumber]
			currentPokemonList.splice(randomNumber, 1)
			currentPokemonList.push(extractedPokemon)

			console.log(currentPokemonList)
		}

		return currentPokemonList
	}

	return (
		<>
			<Aside
				currentPoints={currentPoints}
				maxPoints={maxPoints}
			/>
			<main id="card-list">
				{pokemonList.map((pokemon) => {
					return (
						<Card
							key={pokemon.id}
							pokemonURL={pokemon.url}
							onClick={handleOnClick}
							pokemonID={pokemon.id}
						/>
					)
				})}
			</main>
		</>
	)
}

export default App
