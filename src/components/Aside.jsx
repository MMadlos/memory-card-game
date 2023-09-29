import Scoreboard from "./Scoreboard"
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

			<Scoreboard
				currentPoints={currentPoints}
				maxPoints={maxPoints}
			/>

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
