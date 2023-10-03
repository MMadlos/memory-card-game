import { vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import userEvent from "@testing-library/user-event"

import Aside from "../src/components/Aside"

describe("Aside component", () => {
	it("renders component", () => {
		const { container } = render(<Aside />)
		expect(container).toMatchSnapshot()
	})

	it("renders correct heading", () => {
		render(<Aside />)
		expect(screen.getByRole("heading").textContent).toMatch("Pokememory")
	})

	it("renders level selector", () => {
		render(<Aside />)

		let optionContent = []
		screen.getAllByRole("option").forEach((option) => {
			optionContent.push(option.textContent)
		})

		expect(optionContent).toStrictEqual(["Fácil", "Normal", "Difícil"])
	})

	it("should call the onClick function when clicked", async () => {
		const onClick = vi.fn()
		const user = userEvent.setup()

		render(<Aside onClickInstructions={onClick} />)

		const button = screen.getByRole("button", { name: "Instrucciones" })

		await user.click(button)

		expect(onClick).toHaveBeenCalled()
	})

	it("shouldn't call onClick function when it's not clicked", async () => {
		const onClick = vi.fn()
		render(<Aside onClickInstructions={onClick} />)
		expect(onClick).not.toHaveBeenCalled()
	})
})
