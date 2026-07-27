export function AuthField({
	label,
	error,
	...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	error?: string | null;
}) {
	const errorId = error ? `${props.id}-error` : undefined;

	return (
		<div>
			<label htmlFor={props.id} className="mb-2 block text-text-label">
				{label}
			</label>

			<input
				aria-invalid={Boolean(error)}
				aria-describedby={errorId}
				className="w-full border-2 border-border bg-bg-base px-3 py-2 text-text-bright caret-primary outline-none placeholder:text-text-muted focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
				{...props}
			/>

			{error && (
				<p id={errorId} className="mt-2 text-error">
					{error}
				</p>
			)}
		</div>
	);
}
