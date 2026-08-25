import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Modal } from "./Modal";
import { Tooltip, TooltipProvider } from "./Tooltip";

function setCoarsePointer(matches: boolean) {
	Object.defineProperty(window, "matchMedia", {
		configurable: true,
		value: vi.fn().mockReturnValue({
			matches,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
		}),
	});
}

function renderTooltip(children: React.ReactNode) {
	return render(
		<TooltipProvider>
			<Tooltip content="Helpful detail">{children}</Tooltip>
		</TooltipProvider>,
	);
}

describe("Tooltip", () => {
	beforeEach(() => {
		setCoarsePointer(false);
	});

	it("shows passive tooltip content when tapped with a coarse pointer", () => {
		setCoarsePointer(true);
		renderTooltip(<span>Inspect item</span>);

		expect(screen.queryByText("Helpful detail")).not.toBeInTheDocument();
		fireEvent.click(screen.getByText("Inspect item"));

		expect(screen.getByText("Helpful detail")).toBeInTheDocument();
	});

	it("leaves actionable children unchanged when mobile popovers are disabled", () => {
		setCoarsePointer(true);
		const onClick = vi.fn();
		render(
			<TooltipProvider>
				<Tooltip content="Helpful detail" mobileBehavior="disabled">
					<button onClick={onClick}>Use skill</button>
				</Tooltip>
			</TooltipProvider>,
		);

		fireEvent.click(screen.getByRole("button", { name: "Use skill" }));

		expect(onClick).toHaveBeenCalledOnce();
		expect(screen.queryByText("Helpful detail")).not.toBeInTheDocument();
	});

	it("uses Radix trigger semantics for coarse-pointer popovers", () => {
		setCoarsePointer(true);
		renderTooltip(<span>Inspect item</span>);

		const trigger = screen.getByText("Inspect item").parentElement;
		expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
		expect(trigger).toHaveAttribute("aria-expanded", "false");

		fireEvent.click(trigger!);

		expect(trigger).toHaveAttribute("aria-expanded", "true");
		expect(screen.getByText("Helpful detail")).toBeInTheDocument();
	});

	it("shows desktop tooltip content on focus", async () => {
		renderTooltip(<span>Inspect item</span>);

		fireEvent.focus(screen.getByText("Inspect item").parentElement!);

		expect(await screen.findAllByText("Helpful detail")).not.toHaveLength(0);
	});

	it("portals scrollable content into the nearest modal", () => {
		setCoarsePointer(true);
		render(
			<TooltipProvider>
				<Modal open title="Details" onClose={() => undefined}>
					<Tooltip content="Modal detail">
						<span>Inspect modal item</span>
					</Tooltip>
				</Modal>
			</TooltipProvider>,
		);

		fireEvent.click(screen.getByText("Inspect modal item"));

		const dialog = screen.getByRole("dialog", { name: "Details" });
		const content = screen.getByText("Modal detail");
		expect(dialog).toContainElement(content);
	});
});
