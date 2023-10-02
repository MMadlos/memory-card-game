import { render, screen } from "@testing-library/react"
import Header from "./Header"
import { describe, it, expect } from "vitest"

describe("Header component", () => {
	it("renders title container", () => {
		const { container } = render(<Header />)
		expect(container).toMatchSnapshot()
	})

	it("renders correct heading", () => {
		render(<Header />)
		expect(screen.getByRole("heading").textContent).toMatch("Pokememory")
	})
})
