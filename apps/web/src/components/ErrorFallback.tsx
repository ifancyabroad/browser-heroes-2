import type { FallbackProps } from "react-error-boundary";
import { Button } from "./Button";
import { Card } from "./Card";

export function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-bg-base p-8 text-base text-text">
			<Card
				title="MISHAP"
				className="max-w-md text-center"
				contentClassName="grid gap-4 px-4 pb-4 pt-6"
			>
				<h1 className="text-base text-error">Something went wrong</h1>
				<p className="text-text-muted">
					An unexpected error occurred. Please try refreshing the page.
				</p>
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
