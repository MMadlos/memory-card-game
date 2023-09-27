import { useState, useEffect } from "react"

import "./Styles.css"
import Aside from "./components/Aside"
import Card from "./components/Card"

const API_URL = "https://pokeapi.co/api/v2/pokemon/"

const getFethedURL = (data) => data.sprites.other["official-artwork"].front_default

function getRandomIntInclusive(min = 0, max) {
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

const POKEMON_LIST_EASY = ["pikachu", "charmander", "dragonite", "squirtle", "bulbasaur", "gyarados", "psyduck", "snorlax", "mewtwo", "mew"]

function App() {
	const [pokemonList, setPokemonList] = useState([])
	const [clickedPokemon, setClickedPokemon] = useState([])
	const [currentPoints, setCurrentPoints] = useState(0)
	const [maxPoints, setMaxPoints] = useState(0)
	const [levelSelected, setLevelSelected] = useState("easey")

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

		if (levelSelected === "easey") POKEMON_LIST_EASY.forEach((pokemon) => fetchPokemon(pokemon))
		if (levelSelected === "medium") {
			const randomIDs = getRandomUniqueIDs(20)
			randomIDs.forEach((id) => fetchPokemon(id))
		}

		if (levelSelected === "hard") {
			const randomIDs = getRandomUniqueIDs(40)
			randomIDs.forEach((id) => fetchPokemon(id))
		}

		return () => {
			const emptyArray = []
			setPokemonList(emptyArray)
			setCurrentPoints(0)
			setClickedPokemon(emptyArray)
		}
	}, [levelSelected])

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
			const randomNumber = getRandomIntInclusive(0, currentPokemonList.length - 1)

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
				onChangeLevel={(e) => setLevelSelected(e.target.value)}
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
