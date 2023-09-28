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

function getPokemonListByLevel(level) {
	const POKEMON_LIST_EASY = ["pikachu", "charmander", "dragonite", "squirtle", "bulbasaur", "gyarados", "psyduck", "snorlax", "mewtwo", "mew"]

	const numberCardsByLevel = {
		medium: 20,
		hard: 40,
	}

	return level === "easy" ? POKEMON_LIST_EASY : getRandomUniqueIDs(numberCardsByLevel[level])
}

export { getFethedURL, getRandomIntInclusive, getPokemonListByLevel }
