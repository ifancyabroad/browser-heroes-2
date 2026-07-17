import { classes, type ClassId } from "@app/content";

type ClassSelectProps = {
	value: ClassId | "all";
	onChange: (value: ClassId | "all") => void;
};

export function ClassSelect({ value, onChange }: ClassSelectProps) {
	return (
		<label className="grid gap-1 text-text-label">
			CLASS
			<select
				value={value}
				onChange={(event) => onChange(event.target.value as ClassId | "all")}
				className="min-w-40 border-2 border-border bg-bg-panel px-3 py-1 text-text-bright focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
			>
				<option value="all">All classes</option>
				{classes.map((gameClass) => (
					<option key={gameClass.id} value={gameClass.id}>
						{gameClass.name}
					</option>
				))}
			</select>
		</label>
	);
}
