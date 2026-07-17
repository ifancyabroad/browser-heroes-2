import clsx from "clsx";

const fieldControlClassName =
	"w-full border-2 border-border bg-bg-panel px-3 py-1 text-text-bright focus-visible:border-primary focus-visible:outline-none";

type SearchFieldProps = {
	label: string;
	value: string;
	placeholder?: string;
	maxLength?: number;
	className?: string;
	onChange: (value: string) => void;
};

export function SearchField({
	label,
	value,
	placeholder,
	maxLength,
	className,
	onChange,
}: SearchFieldProps) {
	return (
		<label className={clsx("grid gap-1 text-text-label", className)}>
			{label}
			<input
				type="search"
				value={value}
				placeholder={placeholder}
				maxLength={maxLength}
				onChange={(event) => onChange(event.target.value)}
				className={clsx(fieldControlClassName, "placeholder:text-text-muted")}
			/>
		</label>
	);
}

type SelectOption<TValue extends string> = {
	label: string;
	value: TValue;
};

type SelectFieldProps<TValue extends string> = {
	label: string;
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
}: SelectFieldProps<TValue>) {
	return (
		<label className={clsx("grid gap-1 text-text-label", className)}>
			{label}
			<select
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
