import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { defaultEnemyMetricsFilters } from "../types";
import { EnemyFilters } from "./EnemyFilters";

describe("EnemyFilters", () => {
	it("reports structured filter changes", () => {
		const onChange = vi.fn();
		render(<EnemyFilters values={defaultEnemyMetricsFilters} onChange={onChange} />);

		fireEvent.change(screen.getByLabelText("Class"), { target: { value: "mage" } });
		fireEvent.change(screen.getByLabelText("Battle"), { target: { value: "11-20" } });

		expect(onChange).toHaveBeenCalledWith({
			...defaultEnemyMetricsFilters,
			classId: "mage",
		});
		expect(onChange).toHaveBeenCalledWith({
			...defaultEnemyMetricsFilters,
			battleBand: "11-20",
		});
	});

	it("clamps the minimum combat sample to the API limit", () => {
		const onChange = vi.fn();
		render(<EnemyFilters values={defaultEnemyMetricsFilters} onChange={onChange} />);

		fireEvent.change(screen.getByLabelText("Minimum combats"), {
			target: { value: "100001" },
		});

		expect(onChange).toHaveBeenCalledWith({
			...defaultEnemyMetricsFilters,
			minCombats: 100_000,
		});
	});
});
