import { useState, useEffect } from "react"

import "./Styles.css"
import Aside from "./components/Aside"
import Card from "./components/Card"

import { getFethedURL, getRandomIntInclusive, getPokemonListByLevel } from "./utilities"

const API_URL = "https://pokeapi.co/api/v2/pokemon/"

function App() {
	const [pokemonList, setPokemonList] = useState([])
	const [clickedPokemon, setClickedPokemon] = useState([])
	const [currentPoints, setCurrentPoints] = useState(0)
	const [maxPoints, setMaxPoints] = useState(0)
	const [levelSelected, setLevelSelected] = useState("easy")
	const [resetBoard, setResetBoard] = useState(true)

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

		if (resetBoard) {
			const randomIDs = getPokemonListByLevel(levelSelected)
			randomIDs.forEach((id) => fetchPokemon(id))
			setResetBoard(false)
		}

		return () => {
			setPokemonList([])
			setCurrentPoints(0)
			setClickedPokemon([])
		}
	}, [levelSelected, resetBoard])

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
				const newList = randomizeCards()
				setPokemonList(newList)
				setCurrentPoints(newCurrentPoints)
				setClickedPokemon((prev) => [...prev, pokemonID])
			}
		}

		if (wasAlreadyClicked) {
			if (currentPoints > maxPoints) setMaxPoints(currentPoints)
			setCurrentPoints(0)
			setClickedPokemon([])
			setResetBoard(true)
			alert("You clicked the same pokemon twice. Try again :)")
		}
	}

	function randomizeCards() {
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

	function handleOnChangeLevel(e) {
		setLevelSelected(e.target.value)
		setResetBoard(true)
	}

	function handleOnClickInstructions() {
		alert("INSTRUCTIONS: Avoid clicking the same pokemon card twice.")
	}

	return (
		<>
			<Aside
				onChangeLevel={handleOnChangeLevel}
				currentPoints={currentPoints}
				maxPoints={maxPoints}
				onClickInstructions={handleOnClickInstructions}
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
