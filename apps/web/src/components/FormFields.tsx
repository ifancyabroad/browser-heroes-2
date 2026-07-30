import clsx from "clsx";

const fieldControlClassName =
	"h-9 w-full border-2 border-border bg-bg-base px-3 text-text-bright outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60";

type InputFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "id"> & {
	id: string;
	label?: string;
	error?: string | null;
	className?: string;
};

export function InputField({ label, error, className, ...props }: InputFieldProps) {
	const errorId = error ? `${props.id}-error` : undefined;

	return (
		<div className={clsx("grid gap-1", className)}>
			{label && (
				<label htmlFor={props.id} className="text-text-label">
					{label}
				</label>
			)}
			<input
				{...props}
				aria-invalid={error ? true : props["aria-invalid"]}
				aria-describedby={errorId ?? props["aria-describedby"]}
				className={clsx(fieldControlClassName, "caret-primary placeholder:text-text-muted")}
			/>

			{error && (
				<p id={errorId} className="text-error">
					{error}
				</p>
			)}
		</div>
	);
}

type SelectOption<TValue extends string> = {
	label: string;
	value: TValue;
};

type SelectFieldProps<TValue extends string> = Omit<
	React.SelectHTMLAttributes<HTMLSelectElement>,
	"className" | "onChange" | "value"
> & {
	label?: string;
	value: TValue;
	options: readonly SelectOption<TValue>[];
	className?: string;
	onChange: (value: TValue) => void;
};

export function SelectField<TValue extends string>({
	label,
	value,
	options,
	className,
	onChange,
	...props
}: SelectFieldProps<TValue>) {
	return (
		<label className={clsx("grid gap-1", className)}>
			{label && <span className="text-text-label">{label}</span>}
			<select
				{...props}
				value={value}
				onChange={(event) => onChange(event.target.value as TValue)}
				className={fieldControlClassName}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</label>
	);
}
