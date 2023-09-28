import pokeballLogo from "../assets/pokeball-logo.jpg"

function Aside({ currentPoints, maxPoints, onChangeLevel, onClickInstructions }) {
	return (
		<aside>
			<div className="title-container">
				<img
					id="logo"
					src={pokeballLogo}
					alt="a normal pokeball as a logo of the page"
				/>
				<h1>Pokememory</h1>

				<div className="icon-container">
					<i
						className="fa-solid fa-circle-question"
						onClick={onClickInstructions}
					/>
					<a
						href="https://github.com/MMadlos/memory-card-game"
						target="_blank"
						rel="noreferrer">
						<i className="fa-brands fa-github" />
					</a>
				</div>
			</div>
			<div className="level-container">
				<label htmlFor="level">Nivel</label>
				<select
					name="level"
					id="level"
					onChange={onChangeLevel}>
					<option value="easy">Fácil</option>
					<option value="medium">Normal</option>
					<option value="hard">Difícil</option>
				</select>
			</div>

			<div className="points-container">
				<div className="current-container">
					<p className="points-title">Puntuación actual</p>
					<p className="points">{currentPoints}</p>
				</div>
				<div className="max-container">
					<p className="points-title">Máxima puntuación</p>
					<p className="points">{maxPoints}</p>
				</div>
			</div>

			<div className="buttons-container">
				<button
					id="instructions"
					onClick={onClickInstructions}>
					Instrucciones
				</button>
				<a
					id="github"
					href="https://github.com/MMadlos/memory-card-game"
					target="_blank"
					rel="noreferrer">
					{" "}
					<i className="fa-brands fa-github" /> Ver en github
				</a>
			</div>
		</aside>
	)
}

export default Aside
