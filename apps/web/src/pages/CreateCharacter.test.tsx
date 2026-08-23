import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

const auth = vi.hoisted(() => ({
	useAuth: vi.fn(),
	useCreateGuestSession: vi.fn(),
}));
const runs = vi.hoisted(() => ({
	useCreateRun: vi.fn(),
}));
const showError = vi.hoisted(() => vi.fn());

vi.mock("../features/auth", () => auth);
vi.mock("../features/runs", () => runs);
vi.mock("../stores/errorModalStore", () => ({
	useErrorModalStore: (selector: (state: { showError: typeof showError }) => unknown) =>
		selector({ showError }),
}));
vi.mock("../features/createCharacter", () => ({
	ClassCard: ({
		gameClass,
		onChoose,
		onViewDetails,
	}: {
		gameClass: { id: string; name: string };
		onChoose: (id: string) => void;
		onViewDetails: (id: string) => void;
	}) => (
		<div>
			<button onClick={() => onViewDetails(gameClass.id)}>Details {gameClass.name}</button>
			<button onClick={() => onChoose(gameClass.id)}>{gameClass.name}</button>
		</div>
	),
	ClassDetailsModal: ({
		gameClass,
		onClose,
	}: {
		gameClass: { name: string };
		onClose: () => void;
	}) => (
		<div role="dialog">
			<span>{gameClass.name} details</span>
			<button onClick={onClose}>Close details</button>
		</div>
	),
	HeroNameModal: ({
		isSubmitting,
		onClose,
		onConfirm,
	}: {
		isSubmitting: boolean;
		onClose: () => void;
		onConfirm: (name: string) => void;
	}) => (
		<div role="dialog">
			<span>Name your hero</span>
			<span>{isSubmitting ? "Submitting" : "Ready"}</span>
			<button onClick={onClose}>Close</button>
			<button onClick={() => onConfirm("Test Hero")}>Confirm</button>
		</div>
	),
}));
vi.mock("../components/PageLayout", () => ({
	PageLayout: ({ children }: { children: React.ReactNode }) => children,
}));

import CreateCharacter from "./CreateCharacter";

function renderPage() {
	return render(
		<MemoryRouter initialEntries={["/create-character"]}>
			<Routes>
				<Route path="/create-character" element={<CreateCharacter />} />
				<Route path="/game" element={<div>Game destination</div>} />
			</Routes>
		</MemoryRouter>,
	);
}

describe("CreateCharacter", () => {
	const createGuestSession = { mutateAsync: vi.fn(), isPending: false };
	const createRun = { mutateAsync: vi.fn(), isPending: false };

	beforeEach(() => {
		vi.clearAllMocks();
		auth.useAuth.mockReturnValue({ hasSession: false });
		auth.useCreateGuestSession.mockReturnValue(createGuestSession);
		runs.useCreateRun.mockReturnValue(createRun);
		createGuestSession.mutateAsync.mockResolvedValue({});
		createRun.mutateAsync.mockResolvedValue({});
	});

	it("opens and closes the hero-name modal for a selected class", () => {
		renderPage();

		fireEvent.click(screen.getByRole("button", { name: "Warrior" }));
		expect(screen.getByRole("dialog")).toHaveTextContent("Name your hero");

		fireEvent.click(screen.getByRole("button", { name: "Close" }));
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	it("opens class details without selecting the class", () => {
		renderPage();

		fireEvent.click(screen.getByRole("button", { name: "Details Warrior" }));
		expect(screen.getByRole("dialog")).toHaveTextContent("Warrior details");
		expect(screen.queryByText("Name your hero")).not.toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: "Close details" }));
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	it("creates a guest session before creating the run", async () => {
		const order: string[] = [];
		createGuestSession.mutateAsync.mockImplementation(async () => {
			order.push("session");
		});
		createRun.mutateAsync.mockImplementation(async () => {
			order.push("run");
		});
		renderPage();

		fireEvent.click(screen.getByRole("button", { name: "Warrior" }));
		fireEvent.click(screen.getByRole("button", { name: "Confirm" }));

		await waitFor(() => expect(screen.getByText("Game destination")).toBeInTheDocument());
		expect(order).toEqual(["session", "run"]);
		expect(createRun.mutateAsync).toHaveBeenCalledWith({
			classId: "warrior",
			heroName: "Test Hero",
		});
	});

	it("does not create another guest session for an existing user", async () => {
		auth.useAuth.mockReturnValue({ hasSession: true });
		renderPage();

		fireEvent.click(screen.getByRole("button", { name: "Warrior" }));
		fireEvent.click(screen.getByRole("button", { name: "Confirm" }));

		await waitFor(() => expect(createRun.mutateAsync).toHaveBeenCalledOnce());
		expect(createGuestSession.mutateAsync).not.toHaveBeenCalled();
	});

	it.each([
		["session", createGuestSession.mutateAsync],
		["run", createRun.mutateAsync],
	])("shows the standard error when %s creation fails", async (_stage, mutation) => {
		mutation.mockRejectedValueOnce(new Error("failed"));
		renderPage();

		fireEvent.click(screen.getByRole("button", { name: "Warrior" }));
		fireEvent.click(screen.getByRole("button", { name: "Confirm" }));

		await waitFor(() =>
			expect(showError).toHaveBeenCalledWith("Unable to create your hero. Please try again."),
		);
		expect(screen.queryByText("Game destination")).not.toBeInTheDocument();
	});

	it("passes combined submission state to the modal", () => {
		auth.useCreateGuestSession.mockReturnValue({
			...createGuestSession,
			isPending: true,
		});
		renderPage();

		fireEvent.click(screen.getByRole("button", { name: "Warrior" }));

		expect(screen.getByText("Submitting")).toBeInTheDocument();
	});
});
