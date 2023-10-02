export default function Level({ onChangeLevel }) {
	return (
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
	)
}
