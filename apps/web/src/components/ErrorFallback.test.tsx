import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";

function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {
	if (shouldThrow) {
		throw new Error("Test error");
	}
	return <div>No error</div>;
}

describe("ErrorFallback", () => {
	it("renders children when there is no error", () => {
		render(
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<ThrowError shouldThrow={false} />
			</ErrorBoundary>,
		);

		expect(screen.getByText("No error")).toBeInTheDocument();
	});

	it("renders error UI when child throws", () => {
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		render(
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>,
		);

		expect(screen.getByText("Something went wrong")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();

		consoleSpy.mockRestore();
	});
});
