import Scoreboard from "./Scoreboard"
import Header from "./Header"
import Level from "./Level"

function Aside({ currentPoints, maxPoints, onChangeLevel, onClickInstructions }) {
	return (
		<aside>
			<Header onClickInstructions={onClickInstructions} />
			<Level onChangeLevel={onChangeLevel} />

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
