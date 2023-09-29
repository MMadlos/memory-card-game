import PropTypes from "prop-types"

function Scoreboard({ currentPoints, maxPoints }) {
	return (
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
	)
}

Scoreboard.proptypes = {
	currentPoints: PropTypes.number,
	maxPoints: PropTypes.number,
}

Scoreboard.defaultProps = {
	currentPoints: 0,
	maxPoints: 0,
}

export default Scoreboard
