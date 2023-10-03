import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

import Header from "../src/components/Header"

describe("Header component", () => {
	it("renders component", () => {
		const { container } = render(<Header />)
		expect(container).toMatchSnapshot()
	})

	it("renders correct heading", () => {
		render(<Header />)
		expect(screen.getByRole("heading").textContent).toMatch("Pokememory")
	})
})
