import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ShareRunButton } from "./ShareRunButton";

describe("ShareRunButton", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("opens the native share sheet when available", async () => {
		const share = vi.fn().mockResolvedValue(undefined);
		vi.stubGlobal("navigator", { share });

		render(<ShareRunButton title="A final stand" text="Hero reached battle 20." />);
		expect(
			screen.getByText("Challenge another hero to brave the dungeon. Can they do better?"),
		).toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: "Share Result" }));

		await waitFor(() =>
			expect(share).toHaveBeenCalledWith({
				title: "A final stand",
				text: "Hero reached battle 20.",
				url: new URL("/", window.location.href).toString(),
			}),
		);
	});

	it("copies the result when native sharing is unavailable", async () => {
		const writeText = vi.fn().mockResolvedValue(undefined);
		vi.stubGlobal("navigator", { clipboard: { writeText } });

		render(<ShareRunButton title="A final stand" text="Hero reached battle 20." />);
		fireEvent.click(screen.getByRole("button", { name: "Copy Result" }));

		await waitFor(() => expect(screen.getByRole("button")).toHaveTextContent("Result Copied"));
		expect(writeText).toHaveBeenCalledWith(
			`Hero reached battle 20.\n${new URL("/", window.location.href).toString()}`,
		);
	});

	it("does not show an error when the native share sheet is cancelled", async () => {
		const share = vi.fn().mockRejectedValue(new DOMException("Cancelled", "AbortError"));
		vi.stubGlobal("navigator", { share });

		render(<ShareRunButton title="A final stand" text="Hero reached battle 20." />);
		fireEvent.click(screen.getByRole("button", { name: "Share Result" }));

		await waitFor(() => expect(share).toHaveBeenCalled());
		expect(screen.queryByText("Unable to share this result.")).not.toBeInTheDocument();
	});

	it("clears a previous error when sharing is retried", async () => {
		const share = vi
			.fn()
			.mockRejectedValueOnce(new Error("Share failed"))
			.mockResolvedValueOnce(undefined);
		vi.stubGlobal("navigator", { share });

		render(<ShareRunButton title="A final stand" text="Hero reached battle 20." />);
		fireEvent.click(screen.getByRole("button", { name: "Share Result" }));
		await screen.findByText("Unable to share this result.");

		fireEvent.click(screen.getByRole("button", { name: "Share Result" }));

		await waitFor(() => expect(share).toHaveBeenCalledTimes(2));
		expect(screen.queryByText("Unable to share this result.")).not.toBeInTheDocument();
	});
});
