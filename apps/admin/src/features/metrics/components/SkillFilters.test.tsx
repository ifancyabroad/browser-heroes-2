import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { defaultSkillMetricsFilters } from "../types";
import { SkillFilters } from "./SkillFilters";

describe("SkillFilters", () => {
	it("reports class filter changes", () => {
		const onChange = vi.fn();
		render(<SkillFilters values={defaultSkillMetricsFilters} onChange={onChange} />);

		fireEvent.change(screen.getByLabelText("Class"), { target: { value: "mage" } });

		expect(onChange).toHaveBeenCalledWith({ classId: "mage" });
	});
});
