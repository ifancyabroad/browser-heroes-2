import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { enemies } from "@app/content";
const auth = vi.hoisted(() => vi.fn());
const query = vi.hoisted(() => vi.fn());
vi.mock("../components/Header", () => ({ Header: () => null }));
vi.mock("../components/Footer", () => ({ Footer: () => null }));
vi.mock("../features/auth", () => ({ useAuth: auth }));
vi.mock("../features/bestiary/hooks/useBestiary", () => ({ useBestiary: query }));
import Bestiary from "./Bestiary";

describe("Bestiary", () => {
	beforeEach(() => {
		auth.mockReturnValue({ hasSession: true, user: { id: "owner" } });
		query.mockReturnValue({ data: { entries: [] }, isPending: false, isError: false });
	});
	it("renders an image-free unknown catalogue without leaking enemy names", () => {
		const { container } = render(<Bestiary />);
		expect(screen.getAllByText("Unknown")).toHaveLength(enemies.length);
		expect(container.querySelector("img")).toBeNull();
		expect(container.querySelector('[style*="background-image"]')).toBeNull();
		expect(screen.queryByRole("button")).not.toBeInTheDocument();
		for (const enemy of enemies) {
			expect(screen.queryByText(enemy.name)).not.toBeInTheDocument();
		}
	});
	it("opens only a discovered entry and restores focus when closed", async () => {
		const enemy = enemies[0];
		query.mockReturnValue({
			data: { entries: [{ enemyId: enemy.id, encounters: 3, victories: 2, deaths: 1 }] },
		});
		const { container } = render(<Bestiary />);
		expect(container.querySelector("img")).toBeNull();
		const button = screen.getByRole("button", { name: enemy.name });
		fireEvent.click(button);
		const dialog = await screen.findByRole("dialog");
		expect(within(dialog).getByRole("img", { name: enemy.name })).toBeInTheDocument();
		expect(within(dialog).getByText("Encountered")).toBeInTheDocument();
		fireEvent.click(within(dialog).getByRole("button", { name: "CLOSE" }));
		await waitFor(() => expect(button).toHaveFocus());
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});
	it("disables fetching and shows an unknown catalogue without a session", () => {
		auth.mockReturnValue({ hasSession: false });
		render(<Bestiary />);
		expect(query).toHaveBeenCalledWith(false);
		expect(screen.getAllByText("Unknown")).toHaveLength(enemies.length);
		expect(screen.getByText(`0 / ${enemies.length} DISCOVERED`)).toBeInTheDocument();
	});
	it("shows loading and retryable errors instead of an empty collection", () => {
		query.mockReturnValue({ isPending: true });
		const view = render(<Bestiary />);
		expect(screen.getByRole("status")).toHaveTextContent("Loading bestiary");
		const refetch = vi.fn();
		query.mockReturnValue({ isError: true, refetch });
		view.rerender(<Bestiary />);
		fireEvent.click(screen.getByRole("button", { name: "TRY AGAIN" }));
		expect(refetch).toHaveBeenCalledOnce();
		expect(screen.queryByText("Unknown")).not.toBeInTheDocument();
	});
});
