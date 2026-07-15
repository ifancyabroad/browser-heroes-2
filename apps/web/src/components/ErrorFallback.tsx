import type { FallbackProps } from "react-error-boundary";
import { Button } from "./Button";
import { Card } from "./Card";

/**
 * Extract error message from unknown error type.
 */
function getErrorMessage(error: unknown): string {
	if (error instanceof Error) {
		return error.message;
	}
	return String(error);
}

/**
 * Default fallback UI displayed when an error is caught by an ErrorBoundary.
 * Customize this component to match your app's design.
 */
export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	const errorMessage = getErrorMessage(error);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-bg-base p-8 text-base text-text">
			<Card title="MISHAP" className="max-w-md text-center" contentClassName="grid gap-4 p-4">
				<h1 className="text-base text-error">Something went wrong</h1>
				<p className="text-text-muted">
					An unexpected error occurred. Please try refreshing the page.
				</p>
				<pre className="max-h-64 overflow-auto border-2 border-border bg-bg-base p-3 text-left text-text">
					{errorMessage}
				</pre>
				<Button
					type="button"
					onClick={resetErrorBoundary}
					className="justify-self-center"
					variant="primary"
				>
					Try Again
				</Button>
			</Card>
		</div>
	);
}
