function Card({ pokemonURL, onClick, pokemonID }) {
	return (
		<div
			className="card-container"
			onClick={onClick}>
			<img
				src={pokemonURL}
				alt=""
				data-key={pokemonID}
			/>
		</div>
	)
}

export default Card
