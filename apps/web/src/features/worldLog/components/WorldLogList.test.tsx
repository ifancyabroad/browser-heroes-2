import { render, screen } from "@testing-library/react";
import type { WorldLogEntry } from "@app/shared";
import { describe, expect, it } from "vitest";
import { WorldLogList } from "./WorldLogList";

function entry(id: number): WorldLogEntry {
	return {
		id: String(id),
		createdAt: "2026-01-01T00:00:00.000Z",
		heroName: "Mira",
		classId: "mage",
		mode: "normal",
		displayName: null,
		event: { type: "hero_created" },
	};
}

describe("WorldLogList", () => {
	it("scrolls to new arrivals at the feed limit and to the latest entry when reopened", () => {
		const view = render(<WorldLogList entries={[]} />);
		const scroll = screen.getByLabelText("World activity");
		Object.defineProperty(scroll, "scrollHeight", { value: 1000 });

		const entries = Array.from({ length: 50 }, (_, index) => entry(index));
		view.rerender(<WorldLogList entries={entries} />);
		expect(scroll.scrollTop).toBe(1000);
		view.rerender(<WorldLogList entries={entries} compact />);
		scroll.scrollTop = 200;
		view.rerender(<WorldLogList entries={entries} />);
		expect(scroll.scrollTop).toBe(1000);

		scroll.scrollTop = 200;
		view.rerender(<WorldLogList entries={[...entries.slice(1), entry(50)]} />);
		expect(scroll.scrollTop).toBe(1000);
	});
});
