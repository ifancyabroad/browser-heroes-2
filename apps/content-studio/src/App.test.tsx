import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("content studio routes", () => {
	it("renders a filterable category table and switches to image mode", () => {
		render(
			<MemoryRouter initialEntries={["/skills?q=fire"]}>
				<App />
			</MemoryRouter>,
		);
		expect(screen.getByRole("heading", { name: "Skills" })).toBeInTheDocument();
		expect(screen.getAllByRole("link", { name: /Fireball/i }).length).toBeGreaterThan(0);
		fireEvent.click(screen.getByRole("button", { name: "Images" }));
		expect(screen.getByText("fireball")).toBeInTheDocument();
	});

	it("renders details, complete artwork paths, and references", () => {
		render(
			<MemoryRouter initialEntries={["/enemies/wretch"]}>
				<App />
			</MemoryRouter>,
		);
		expect(screen.getByRole("heading", { name: "Wretch" })).toBeInTheDocument();
		expect(screen.getByText("enemies/dungeon/wretch.png")).toBeInTheDocument();
		expect(screen.getByRole("link", { name: /Leap Attack/i })).toHaveAttribute(
			"href",
			"/skills/leap_attack",
		);
	});

	it("preserves list state in the detail back link", () => {
		render(
			<MemoryRouter initialEntries={["/enemies?q=wretch&zone=dungeon"]}>
				<App />
			</MemoryRouter>,
		);
		fireEvent.click(screen.getAllByRole("link", { name: "Wretch" })[0]!);
		expect(screen.getByRole("link", { name: /Back to Enemies/ })).toHaveAttribute(
			"href",
			"/enemies?q=wretch&zone=dungeon",
		);
	});

	it("shows a useful message for an unknown registry id", () => {
		render(
			<MemoryRouter initialEntries={["/skills/not_real"]}>
				<App />
			</MemoryRouter>,
		);
		expect(screen.getByRole("heading", { name: "Skill not found" })).toBeInTheDocument();
	});
});
