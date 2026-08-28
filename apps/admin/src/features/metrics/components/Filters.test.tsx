import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Filters } from "./Filters";

const filters = {
	from: "2026-08-01",
	to: "2026-08-30",
	mode: "all",
} as const;

describe("Filters", () => {
	it("applies date presets", () => {
		const onChange = vi.fn();
		render(<Filters filters={filters} preset={30} onChange={onChange} />);

		fireEvent.click(screen.getByRole("button", { name: "7d" }));

		expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ mode: "all" }), 7);
	});
	it("applies a run mode without changing the date preset", () => {
		const onChange = vi.fn();
		render(<Filters filters={filters} preset={30} onChange={onChange} />);

		fireEvent.change(screen.getByLabelText("Mode"), {
			target: { value: "dailyChallenge" },
		});

		expect(onChange).toHaveBeenCalledWith({ ...filters, mode: "dailyChallenge" }, 30);
	});
	it("includes both years when the reporting window crosses a year boundary", () => {
		render(
			<Filters
				filters={{ ...filters, from: "2025-12-15", to: "2026-01-12" }}
				preset={30}
				onChange={vi.fn()}
			/>,
		);

		expect(screen.getByText("15 Dec 2025 – 12 Jan 2026")).toBeInTheDocument();
	});
});
