import { useState, useEffect } from "react"

import "./Styles.css"
import Aside from "./components/Aside"
import Card from "./components/Card"

const API_URL = "https://pokeapi.co/api/v2/pokemon/"
const POKEMON_LIST_EASY = ["pikachu", "charmander", "dragonite", "squirtle", "bulbasaur", "gyarados", "psyduck", "snorlax", "mewtwo", "mew"]

const getFethedURL = (data) => data.sprites.other["official-artwork"].front_default

function getRandomIntInclusive(min = 0, max) {
	// The max and min are inclusive
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomUniqueIDs(numberOfIDs) {
	let arrayWithIDs = []

	for (let i = 0; i < numberOfIDs; i++) {
		loopRandomNumsUntilFound()
	}

	function loopRandomNumsUntilFound() {
		const randomNumber = getRandomIntInclusive(1, 151)
		if (!arrayWithIDs.includes(randomNumber)) {
			arrayWithIDs.push(randomNumber)
			return
		}
		if (arrayWithIDs.includes(randomNumber)) loopRandomNumsUntilFound()
	}

	return arrayWithIDs
}

function App() {
	const [pokemonList, setPokemonList] = useState([])
	const [clickedPokemon, setClickedPokemon] = useState([])
	const [currentPoints, setCurrentPoints] = useState(0)
	const [maxPoints, setMaxPoints] = useState(0)

	const mediumIDs = getRandomUniqueIDs(10)
	console.log(mediumIDs)

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
				const newList = randomPokemonOrder()
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

	function randomPokemonOrder() {
		const currentPokemonList = pokemonList
		const lengthPokemonList = pokemonList.length

		let newArray = []
		for (let i = 0; i < lengthPokemonList; i++) {
			const randomNumber = getRandomIntInclusive(currentPokemonList.length - 1)

			newArray.push(currentPokemonList[randomNumber])
			currentPokemonList.splice(randomNumber, 1)
		}

		return newArray
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
