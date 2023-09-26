function Card({ pokemonURL }) {
	return (
		<div className="card-container">
			<img
				src={pokemonURL}
				alt=""
			/>
		</div>
	)
}

export default Card
