import pokeballLogo from "../assets/pokeball-logo.jpg"

export default function Header({ onClickInstructions }) {
	return (
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
	)
}
