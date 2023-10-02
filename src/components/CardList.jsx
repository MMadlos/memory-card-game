import Card from "./Card"

export default function CardList({ pokemonList, handleOnClickCard }) {
	return (
		<main id="card-list">
			{pokemonList.map((pokemon) => {
				return (
					<Card
						key={pokemon.id}
						pokemonURL={pokemon.url}
						onClick={handleOnClickCard}
						pokemonID={pokemon.id}
					/>
				)
			})}
		</main>
	)
}
