import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QueryError } from "./QueryState";

describe("query states", () => {
	it("retries an errored query", () => {
		const retry = vi.fn();
		render(<QueryError onRetry={retry} />);
		fireEvent.click(screen.getByRole("button", { name: "Try again" }));
		expect(retry).toHaveBeenCalledOnce();
	});
});
