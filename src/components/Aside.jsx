import pokeballLogo from "../assets/pokeball-logo.jpg"

function Aside({ currentPoints, maxPoints, onChangeLevel }) {
	return (
		<aside>
			<div className="logo-container">
				<img
					id="logo"
					src={pokeballLogo}
					alt="a normal pokeball as a logo of the page"
				/>
				<h1>Pokememory</h1>
			</div>
			<div className="level-container">
				<label htmlFor="level">Dificultad</label>
				<select
					name="level"
					id="level"
					onChange={onChangeLevel}>
					<option value="easy">Fácil</option>
					<option value="medium">Normal</option>
					<option value="hard">Difícil</option>
				</select>
			</div>
			<div className="current-points-container">
				<p>Puntuación actual</p>
				<p>{currentPoints}</p>
			</div>
			<div className="max-points-container">
				<p>Máxima puntuación</p>
				<p>{maxPoints}</p>
			</div>

			<div className="buttons-container">
				<button id="instructions">Instrucciones</button>
				<button id="github">(ICONO) Ver en github</button>
			</div>
		</aside>
	)
}

export default Aside
