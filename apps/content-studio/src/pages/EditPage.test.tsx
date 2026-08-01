import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EditPage } from "./EditPage";

const achievement = {
	id: "acquire_legendary_item",
	order: 3,
	name: "A Legend in Hand",
	description: "Acquire a legendary item.",
	icon: "skills/feats/armour.png",
};

describe("content editor", () => {
	afterEach(() => vi.restoreAllMocks());

	it("loads a fresh draft, keeps the id immutable, and directly saves changes", async () => {
		const fetchMock = vi
			.spyOn(globalThis, "fetch")
			.mockResolvedValueOnce(
				new Response(
					JSON.stringify({
						category: "achievements",
						id: achievement.id,
						draft: achievement,
						revision: "revision-one",
						file: "src/achievements/acquireLegendaryItem.ts",
					}),
					{ status: 200, headers: { "Content-Type": "application/json" } },
				),
			)
			.mockResolvedValueOnce(
				new Response(
					JSON.stringify({
						category: "achievements",
						id: achievement.id,
						draft: { ...achievement, name: "A New Legend" },
						revision: "revision-two",
						file: "src/achievements/acquireLegendaryItem.ts",
						changedFields: ["name"],
					}),
					{ status: 200, headers: { "Content-Type": "application/json" } },
				),
			);

		render(
			<MemoryRouter initialEntries={[`/achievements/${achievement.id}/edit`]}>
				<Routes>
					<Route path=":category/:id/edit" element={<EditPage />} />
				</Routes>
			</MemoryRouter>,
		);

		const id = await screen.findByDisplayValue(achievement.id);
		expect(id).toBeDisabled();
		fireEvent.change(screen.getByDisplayValue(achievement.name), {
			target: { value: "A New Legend" },
		});
		fireEvent.click(screen.getAllByRole("button", { name: "Save" })[0]!);

		await screen.findByText(/Changed: name/);
		expect(fetchMock).toHaveBeenCalledTimes(2);
		const request = fetchMock.mock.calls[1]![1]!;
		expect(request.method).toBe("PUT");
		expect(JSON.parse(String(request.body))).toMatchObject({
			revision: "revision-one",
			draft: { id: achievement.id, name: "A New Legend" },
		});
		await waitFor(() => expect(screen.getByText("All changes saved")).toBeInTheDocument());
	});
});
